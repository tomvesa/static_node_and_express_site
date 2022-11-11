const express = require("express");
const app = express();


app.set("view engine", "pug");
app.use("/static", express.static('public'));
app.use("/img", express.static('images'));


// call routes
const projectRoutes = require('./routes/project');
app.use(projectRoutes);


// 404 error 
app.use((req, res, next) =>{
    const err = new Error("The page you are looking for does not exist");
    err.status = 404;
    err.messageTitle = "No such page here :("
    next(err);
})

app.use((err, req, res, next) => {
    if(err){
        console.log("Global Error called");
    }

    if(err.status === 404){
        res.status(404);
        console.log(err.status);
        console.log(err.stack);
        res.render('page-not-found', { err });
    } else {
        
       err.messageTitle = "OOPS this is wrong"
       err.status = res.statusCode === 200 ? 500 : res.statusCode;
       console.log(err.status);
       console.log(err.stack);
       res.render('error', { err });

    }
})
 
app.listen(3000, ()=>{console.log("server ready")});

module.exports = app;