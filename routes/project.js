const express = require('express');
const router = express.Router();
const data = require("../data.json");
const userData = require("../user.json");
const { users } = userData;
const { projects } = data;



router.get("/project/:id", (req, res) => {
        const id = req.params.id;
        //check the id exist and is not 0, if it is 0 make it 1
        const idNum = id && id != 0 ? parseInt(id) : 1;
        const foundProject = projects.find(item => item.id === idNum);

        if(foundProject){
            res.render("project", { foundProject });
        }else{
            // sending id without project to template pug
            res.render("project", {  id });
        }
});

//redirect to first project if no id provided
router.get("/project/", (req, res) => {
        res.redirect('/project/1');
});


router.get("/about", (req, res) => {
    res.render("about", users[0]);
});


router.get("/", (req, res) => {
    res.render("index", {projects});
});

module.exports = router;