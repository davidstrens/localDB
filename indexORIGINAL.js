//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser"); //gives req a body that contains form values

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//I heard about public folder for static files from Angela Yu, but this site is good too:
//https://www.tutorialsteacher.com/nodejs/serving-static-files-in-nodejs though he'd forgotten to include the / in front of public but thanks to Angela's course, seeing how I set the file path to send forms, I thought I should try adding the forward slash (/)
app.use(express.static(__dirname + '/public')); //Serves resources from public folder

const fs = require('fs');
const path = require('path');

/*
// how to write is from: https://nodejs.org/en/knowledge/file-system/how-to-write-files-in-nodejs/
//fs.writeFile('starter.txt', 'Hello, my name is David', function (err) {
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you.', (err, data) => {
  if (err) return console.log(err);
  console.log('Write complete');
  //fs.appendFile() is inside fs.writeFile() to make sure it happens after the file is written, as
  //both are async functions and either one can happen before the other one otherwise.
  fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is', (err, data) => {
    if (err) return console.log(err);
    console.log('Append complete');
  })
});

let appendThis = ""

fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '...', (err) => {
  if (err) return console.log(err);
  console.log('Append complete');
});

//fs.readFile(__dirname + "/starter.txt", (err, data) => {
fs.readFile(path.join(__dirname, "files", "reply.txt"), (err, data) => {
  if (err) throw err;
  fileData = data.toString();
  console.log(fileData.length);
});
*/

fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '1', (err) => {
  if (err) return console.log(err);
  console.log('Append complete');

let processedData = "hello";
  fs.readFile(path.join(__dirname, "files", "reply.txt"), (err, data) => {
    if (err) throw err;
    fileData = data.toString();
    processedData += " let's see now";
    //console.log('hummm... plus ', fileData.slice(200, 220));
    console.log('processedData before: ', processedData);
    processedData.concat(fileData.slice(87966, 88000)); // .concat RETURNS a new string, it doens't modify the original string
    console.log('processedData  after: ', processedData);

  });

});

app.get('/', function (req, res) {
  res.send(fileData);
  console.log('someone requested our page');
})

/*
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/homepage.html"); //__dirname is filepath (directory) that this file (calculator.js) is in
  console.log(__dirname);

});
*/

//app.listen(3000, function() {
  app.listen(process.env.PORT || 3000, function() {
  console.log("listening on port 3000");
});
