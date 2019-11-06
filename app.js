var express = require("express");
var cors = require('cors')

var app = express();
var bodyParser =  require("body-parser");
var path = require('path');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todo"); 

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname ,'/views')));

var todoSchema = new mongoose.Schema({
    name : String
});
var todo = mongoose.model("todo",todoSchema);

app.get("/todo",function(req,res){
    todo.find({},function(err, items){
        if(err) console.log(err);
        else{
            res.json({
                todoList: items
            })
        }
    });
});

app.post("/newtodo",function(req,res){
    var newItem = new todo({
        name: req.body.name
    });
    newItem.save(newItem, function(err,todo){
        if(err) console.log(err);
        else{
        }
    });
    res.send({success: true})
});

app.post("/remove",function(req,res){
    var remItem = {
        key:req.body.list
      };
    todo.deleteOne(remItem,function(err,todo){
        if(err) console.log(err);
        else{
            console.log("gone to air:" + todo);
        }
    });
    res.send({success: true})
});

app.get("/", function(req,res){ 
     res.send("<h1>Error 404</h1>");
});

app.listen(8010,function() {
    console.log("server emerged");
});