var express = require("express");
var app = express();

const port = 3000;
const ip = "localhost";

app.set("view engine", "ejs");

app.get("/", function(req, res){
 res.send("Página inicial");
});

app.listen(port, ip, function(){
    console.log("Pet-feeder foi inicializado...")
});
