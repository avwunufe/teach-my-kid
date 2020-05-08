const express = require('express');
const router = express.Router();
const User = require("../models/users");
const bcrypt = require('bcryptjs');
const { updateValidation } = require('../validation');
const verifylogin = require('../verifyUser')


router.get('/edit', verifylogin, (req, res)=>{
    res.render('profiles/editprofile', {message: ""})
   })
   router.post('/edit', verifylogin, async (req, res)=>{
    const {error} = await updateValidation(req.body);
    if (error) return res.status(400).render('profiles/editprofile', {message: error.details[0].message})
    const user = await User.findOne({_id: req.user._id});
    const validOldPassWord = await bcrypt.compare(req.body.Password, user.Password);
    if (!validOldPassWord) return res.status(400).render('profiles/editprofile', {message: "You entered a wrong old password"});
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.NewPassword, salt);
   try{
       await User.updateOne({_id: user._id}, {
           FirstName: req.body.FirstName,
           LastName: req.body.LastName,
           Email: req.body.Email,
           Password: hashedPassword
   })
   res.redirect('/class')
   }catch (error){
       console.error(error)
   }
    
   })

   module.exports = router