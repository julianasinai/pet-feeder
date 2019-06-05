var express = require("express");
var app = express();

const port = 3000;
const ip = "localhost";

app.set("view engine", "ejs");

app.get("/", function(req, res){
 res.send("Página inicial");
});

app.get("/quem-somos", function(req, res){
    res.send("História do projeto");
});

app.get("apadrinhamento", function(req, res){
    res.send("Adquira sua vasilha");
});

app.listen(port, ip, function(){
    console.log("Pet-feeder foi inicializado...")
});
