const   express       = require("express"),
        bodyParser    = require("body-parser"),
        app           = express();

// const port = 3000;
// const ip = "localhost";
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
 res.render("landing");
});

app.use("/mapa", function(req, res){
    res.render("mapa");
});

app.get("/quem-somos", function(req, res){
    res.render("quem-somos");
});

app.get("/apadrinhamento", function(req, res){
    res.render("apadrinhamento");
});

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Pet-feeder foi inicializado...")
// });
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))