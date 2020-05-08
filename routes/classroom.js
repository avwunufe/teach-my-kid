const express = require("express");
const router = express.Router();
const { classValidation } = require("../validation");
const Class = require("../models/classroom");
const Feed = require('../models/feed')
const ClassWork = require('../models/classwork')
const verifylogin = require('../verifyUser')

// GET route for homepage and displays all joined classes
router.get("/", verifylogin, async (req, res)=>{
    //use better query with $elemmatch/$in to include students joining not only creator
    const myClasses = await Class.find({$or: [{Creator: req.user._id}, {JoinedUsers: {$elemMatch: {UserID: req.user._id}}}]})
    res.render("classroom/home", {message: "", classes: myClasses});
    
});
// Ajax route for joining a class
router.post("/join", async (req, res)=>{
 const validClass = await Class.findOne({Code: req.body.Code});
  if (!validClass) return res.redirect("/class");
 const alreadyJoined = await Class.find({$or: [{$and: [{Code: req.body.Code}, {JoinedUsers: {$elemMatch: {UserID: req.user._id}}}]}, {$and: [{Code: req.body.Code}, {Creator: req.user._id}]}]});
 if (alreadyJoined.length > 0){
    console.log(alreadyJoined)
    return res.redirect("/class");
 }else{
    await validClass.JoinedUsers.push({UserID: req.user._id});
    const joinSuccess = await validClass.save();
    res.send(joinSuccess)
 }


});

// GET route for create classes only teacher should access
router.get("/create", verifylogin, async (req, res)=>{
    res.render("classroom/create", {message: ""})
});
// POST route for create classes only teacher should access
router.post("/create", async (req, res)=>{
    const {error} = await classValidation(req.body);
    if (error) return res.status(400).render('classroom/create', {message: error.details[0].message});
    const codeExist = await Class.findOne({Code: req.body.Code});
    if (codeExist) return res.status(422).render('classroom/create', {message: "Class code must be unique! Try again with a different code"});
    try {
        const success = await Class.create(req.body);
        res.redirect("/class");
    } catch (error) {
        res.render("classroom/home", {message: "Failure to create class!"} )

    }

});
//  GET route for individual class
router.get("/:id", verifylogin, async (req, res)=>{
    const currentClass = await Class.findOne({_id: req.params.id});
    res.render("classroom/class", {myClass: currentClass})
});
//  GET route for individual class, feed section
router.get("/:id/feed", verifylogin, async (req, res)=>{
    const currentClass = await Class.findOne({_id: req.params.id});
    const allFeed = await Feed.find({ClassID: req.params.id});
    res.render("classroom/feed", {myClass: currentClass, feedPosts: allFeed})
});

//  POST route for adding new post to feed
router.post("/feed", async (req, res)=>{
    try{
        await Feed.create(req.body)
        const allFeed = await Feed.find({});
        res.send(allFeed)
    } catch (error){
        console.error(error)
    }
});

//  POST route for adding new comment to each feed post
router.post("/feed/:id", async (req, res)=>{
    try{
        console.log(req.params.id)
        const parentFeed = await Feed.findOne({_id: req.params.id});
        console.log(parentFeed)
        console.log(req.body)
       await parentFeed.Comments.push(req.body);
       const newFeed = await parentFeed.save()
       res.send(newFeed);
    
    } catch (error){
        console.error(error)
    }
});

//  GET route for individual class, classwork section
router.get("/:id/classwork", verifylogin, async (req, res)=>{
    const currentClass = await Class.findOne({_id: req.params.id});
    const allClasswork = await ClassWork.find({ClassID: req.params.id});
    res.render("classroom/classwork", {myClass: currentClass, classWork: allClasswork})
});

//  POST route for adding new classwork
router.post("/classwork", async (req, res)=>{
    try{
        await ClassWork.create(req.body)
        const allClasswork = await ClassWork.find({});
        res.send(allClasswork)
    } catch (error){
        console.error(error)
    }
});

//  POST route for adding new comment to each classwork
router.post("/classwork/:id", async (req, res)=>{
    try{
        console.log(req.params.id)
        const parentClasswork = await ClassWork.findOne({_id: req.params.id});
        console.log(parentClasswork)
        console.log(req.body)
       await parentClasswork.Comments.push(req.body);
       const newParentClasswork = await parentClasswork.save()
       res.send(newParentClasswork);
    
    } catch (error){
        console.error(error)
    }
});

//  GET route for individual class, assignment section
router.get("/:id/assignments", verifylogin, async (req, res)=>{
    const currentClass = await Class.findOne({_id: req.params.id});
    res.render("classroom/assignment", {myClass: currentClass})
});

module.exports =  router