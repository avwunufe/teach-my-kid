const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth");
const classRoutes = require("./routes/classroom");
const profileRoutes = require("./routes/profile");
const passport = require('passport')
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();


app.set("view engine", "ejs");
app.use(express.static("public"));
// Express session middleware
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next()
})
app.post('*', function(req, res, next){
    res.locals.user = req.user || null;
    next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/users", authRoutes);
app.use("/class", classRoutes);
app.use("/profile", profileRoutes);

require('./config/passport')(passport);

mongoose.connect(process.env.TOKEN_SECRET, { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
    console.log('Connected to DB')
}).on('error', ()=>{
    console.log('Theres been an error')
});

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{console.log("Listening on port "+ PORT)})