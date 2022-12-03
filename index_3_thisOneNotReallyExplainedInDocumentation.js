//jshint esversion:6

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// * * * * * * * * * * * * N O T E * * * * * * * * * * * * * * * * * * * * * * * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// if files are very large, it may be better to grab a little bit at a time, like grabbing a bucket of water
// at a time from a swimming pool, instead of trying to grab all the water at once.
// This is what this file is for:

const express = require("express");
const bodyParser = require("body-parser"); //gives req a body that contains form values

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//I heard about public folder for static files from Angela Yu, but this site is good too:
//https://www.tutorialsteacher.com/nodejs/serving-static-files-in-nodejs though he'd forgotten to include the / in front of public but thanks to Angela's course, seeing how I set the file path to send forms, I thought I should try adding the forward slash (/)
app.use(express.static(__dirname + '/public')); //Serves resources from public folder

const fs = require('fs');
const path = require('path');
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), (err, data) => {
  const fileData = data //data.toString();   I commented out data.toString() so I could see the buffer ie. the utf8 representation of the characters
  console.log('line 26: fileData.length is: ', fileData, fileData.length);
})

const rs = fs.createReadStream('./files/starter.txt', { encoding: 'utf8', start: 2, end: 4 }); //start: first index to include, last: last index to include
const ws = fs.createWriteStream('./files/new-starter.txt');

let myBucket = "";
rs.on('data', (bucket) => { //bucket is just a name I chose
  ws.write(bucket); //this tells the function what to do with each bucket of water, so to speak
  console.log(bucket);
  console.log(bucket.length);
})

// * N O T  R E C O M M E N D E D * : Using fs.stat() to check for the existence of a file before calling fs.open(), fs.readFile(), or fs.writeFile() is not recommended. Instead, user code should open/read/write the file directly and handle the error raised if the file is not available.
fs.mkdir('./newer', (err) => {
  if (err) {
    console.log(err);
    //throw err;
  }
  console.log('Directory created');
})




//app.listen(3000, function() {
  app.listen(process.env.PORT || 3000, function() {
  console.log("listening on port 3000");
});
