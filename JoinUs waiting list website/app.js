//require packages that I installed 
var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));


var connection = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
		password:'Password1!',
        database:'join_us'
    }
    );
    
//ROUTES

//homepage
app.get("/", function(req,res){
	var myQuery = 'SELECT COUNT(*) AS count FROM users';
	connection.query(myQuery, function(err,results){
		if (err) throw err;
		var count = results[0].count;
		res.render("home",{data:count})		
	});
});

// POST request in the form
app.post("/register", function(req,res){
	
	var person = {
    email: req.body.email
	};
	
	connection.query('INSERT INTO users SET ?', person, function(err, result) {
	  if (err) throw err;
	  res.redirect("/")
	});
});




//get a joke
app.get("/joke", function(req,res){
	
	
	res.send("Joke's on you.")
	console.log("Someone requested a joke!")
});

//get random number
app.get("/random_num",function(req, res){
	
	var randomNum = Math.floor(Math.random() * 10) + 1;
	
	res.send("Your lucky number is: " + randomNum);
	
});



app.listen(3000, function(){
	console.log('Server running on port 3000!');

});
