var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
const clientModel = require("../models/client");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

// Signup post route
router.post('/signup', async function(req, res, next) {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.redirect('/signin'); // Corrected the redirection path
  } catch (error) {
    res.render('error', { error }); // Render the 'error.ejs' template
  }
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

// Signin post route
router.post('/signin', async function(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // Corrected the query to find the user
    if (!user) {
      return res.send(`User not found. <a href="/signup">Sign up</a>`);
    }
    if (user.password !== password) {
      return res.send(`Incorrect password. <a href="/signup">Sign up</a>`);
    }
    res.redirect('/profile'); // Redirect to the profile page after successful sign-in
  } catch (error) {
    res.render('error', { error }); // Render the 'error.ejs' template
  }
});

router.get('/profile', async function(req, res, next) {
  const clients = await clientModel.find();
  res.render('profile',{clients});
});

router.route("/clientRegister").post(async (req,res) => {
  const client = await clientModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    jobTitle: req.body.jobTitle,
    status: req.body.status,
    experience: req.body.experience,
    taskHistory: req.body.taskHistory
  });
  res.send(`Successfully registered with ID: ${client._id} HOME: <a class="text-decoration-none" href="/">🏡</a>`);
}) 



router.get('/deleteClient/:id', async function(req, res, next) {
  const client = await clientModel.findByIdAndDelete(req.params.id);
  res.redirect('/profile');
});

router.post('/updateClient/:id', async function(req, res, next) {
  const client = await clientModel.findByIdAndUpdate(req.params.id,{status:req.body.status,jobTitle: req.body.jobTitle,taskHistory: req.body.taskHistory});
  res.redirect('/profile');
});

module.exports = router;
