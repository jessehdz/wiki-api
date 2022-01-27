const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

//articles schema ----------------------------------------------------
const articleSchema = new mongoose.Schema({
    title: {
      type: String,
      required: "Title is missing. Please add a title to continue."
    },
    content: String
}); 

const Article = mongoose.model("Article", articleSchema);


//GET
app.get("/articles", function(req, res){
    //READ
    Article.find({}, function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
        
    })
})

//POST
app.post("/articles", function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);
})



app.listen(3000, function() {
    console.log("Wiki-API: server running on port 3000");
})