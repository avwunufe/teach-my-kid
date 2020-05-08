const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { notLogged } = require("../verifyUser")



router.post('/signup', async (req, res)=>{

    const {error} = await registerValidation(req.body);
    if (error) return res.status(400).render('auth/signup', {message: error.details[0].message});
    const emailExist = await User.findOne({Email: req.body.Email});
    if (emailExist) return res.status(422).render('auth/signup', {message: "Email already exists!"});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt)
    try { 
    const newUser = await User.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: hashedPassword,
        role: req.body.role
    });
    res.redirect('signin');
    // res.render('signin', {message: "You are successfully registered. Please login"})
    } catch (error) {
        console.error(error);
        res.redirect('signup')
    }
    });

router.post('/signin', async (req, res, next)=>{
    const {error} = await loginValidation(req.body);
    if (error) return res.status(400).render('auth/signin', {message: error.details[0].message});
    passport.authenticate('local', {
        successRedirect:'/class/',
        failureRedirect:'/users/signin',
        failureFlash: false
    })(req, res, next);

    // // const validUser = await User.findOne({Email: req.body.Email});
    // // if (!validUser) return res.status(400).render('signin', {message: "Invalid Email"});
    // try { 
    // // const success = await bcrypt.compare(req.body.Password, validUser.Password);
    // // if(!success) return res.status(400).render('signin', {message: "Invalid login credentials"});
    // const token = await jwt.sign({_id: validUser._id, role: validUser.role}, process.env.TOKEN_SECRET);
    // if(validUser.role == "parent"){
    //     res.header('auth-token', token).redirect('parentshome');
    //     // res.render('parentshome', {user: validUser})
    // } else if(validUser.role == "tutor"){
    //     res.header('auth-token', token).redirect('teachershome');  
    //     // res.render('teachershome', {user: validUser})
    // }
    // } catch (error) {
    //     console.log(error)
    // }
});

router.get('/signin', notLogged, async (req, res)=>{
    res.render('auth/signin', {message: ""})
    });
router.get('/signup', notLogged, async (req, res)=>{
    res.render('auth/signup', {message: ""})
    });             
router.get('/logout', async (req, res)=>{
    req.logout();
    res.redirect('signin')
    });       

module.exports = router;