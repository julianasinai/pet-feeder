const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const port = 3000;
const ip = "localhost";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
 res.send("Página inicial");
});

app.get("/quem-somos", function(req, res){
    res.render("quem-somos");
});

app.get("apadrinhamento", function(req, res){
    res.send("Adquira sua vasilha");
});

app.listen(port, ip, function(){
    console.log("Pet-feeder foi inicializado...")
});
