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


app.route("/articles")
    //GET ------------------------------------------
    .get("/articles", function(req, res){
    //READ
    Article.find({}, function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
    })

    //POST -----------------------------------------
    .post(function(req, res){
        onsole.log(req.body.title);
        console.log(req.body.content);

    //CREATE
    const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
    })

    newArticle.save(function(err){
        if(!err){
            res.send("Succesfully added a new article.");
        } else {
            res.send(err);
        }
    });
    })

    //DELETE ---------------------------------------
    .delete(function(req, res){
        Article.deleteMany({}, function(err){
            if(!err) {
                res.send("Succesfully deleted all articles");
            } else {
                res.send(err);
            }
        })
    });


app.listen(3000, function() {
    console.log("Wiki-API: server running on port 3000");
})