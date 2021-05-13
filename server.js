//documentation :
//https://tutorialedge.net/nodejs/creating-a-webserver-with-nodejs/
//https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express
//https://expressjs.com/en/guide/using-middleware.html
//https://expressjs.com/en/guide/routing.html

var express = require("express");

var path = require("path");
var app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/api/random", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ number: Math.floor(Math.random() * 1024) }));
});

app.get("/api/custom_random/:id", function (req, res) {
  const { id } = req.params;
  console.log(id);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ number: Math.floor(Math.random() * id) + 1 }));
});

app.post("/", express.json(), function (req, res) {
  const vowels = ["a", "e", "i", "o", "u"];
  const str = req.body.word;
  const sortedStrArr = str.split("").sort();
  const result = sortedStrArr.filter((vowel) => vowels.includes(vowel));

  res.send(JSON.stringify({ vowels: result.length }));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(host, port);
});
