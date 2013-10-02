var express = require("express"),
    fs = require("fs"),
    app = express();

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
}

app.configure(function () {
    app.use(allowCrossDomain);
});

function readQuotes() {
    var text = fs.readFileSync(__dirname + "/quotes.txt", {
        encoding: "utf-8"
    });
    return text.split(/\r?\n\r?\n/).map(function (s) {
        return s.trim().replace(/\r?\n/g, "<br/>");
    });
}

var quotes = readQuotes();


app.get("/hello", function(req, res){
    console.log("GET /hello");
    res.send("Hello there!");
});

app.post("/reverse", function (req, res) {
    var text = req.body.text;
    console.log("POST /reverse: " + text);
    res.send(text.split("").reverse().join(""));
});

app.get("/quote", function (req, res) {
    console.log("GET /quote");
    var idx = Math.floor(Math.random() * quotes.length);
    res.set("Cache-Control", "no-cache, no-store");
    res.send(quotes[idx]);
});


app.listen(3000);
console.log("Listening on port 3000...");