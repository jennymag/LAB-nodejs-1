//documentation :
//https://tutorialedge.net/nodejs/creating-a-webserver-with-nodejs/
//https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express
//https://expressjs.com/en/guide/using-middleware.html
//https://expressjs.com/en/guide/routing.html

var express = require("express");

var path = require("path");
var app = express();

app.use(express.json());
var currValue = 0;
var oldValue = 0;

app.use(express.static("public"));

app.get("/api/value", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ value: currValue }));
});

app.get("/api/increase", function (req, res) {
  oldValue = currValue;
  currValue += 1;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ newValue: currValue, oldValue }));
});

app.get("/api/decrease", function (req, res) {
  oldValue = currValue;
  currValue = currValue - 1;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ newValue: currValue, oldValue }));
});

app.get("/api/random", function (req, res) {
  res.send({ number: Math.floor(Math.random() * 1024) });
});

app.get("/api/custom_random/:id", function (req, res) {
  const { id } = req.params;
  res.send({ number: Math.floor(Math.random() * id) + 1 });
});

app.post("/api/vowels", function (req, res) {
  const { word } = req.body;
  if (!word) {
    res.send({
      success: false,
      message: "You need to include a body: {word: <word>}",
    });
    return;
  }
  const result = sortedStrArr.filter((vowel) =>
    "AEIOUaeiouåäö".includes(vowel)
  );
  const vowels = word
    .split("")
    .filter((vowel) => "AEIOUaeiouåäö".includes(vowel)).length;
  res.send({ vowels });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(host, port);
});
