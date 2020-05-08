const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const config = require('./config');

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: "Email",
passwordField: "Password"}, async function(username, password, done){
   const user = await User.findOne({Email: username});
   if (!user){
       return done(null, false)
   }
   try {
    const validLogin = await bcrypt.compare(password, user.Password);
    if (validLogin){
        return done(null, user);
        
    } else {
        return done(null, false);
    }
   } catch (e){
    return done(e)
   }
}))
    passport.serializeUser(function(user, done){
        done(null, user.id)
    });
    passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
          done(err, user)
      })
        
    })
}