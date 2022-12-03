//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser"); //gives req a body that contains form values

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//I heard about public folder for static files from Angela Yu, but this site is good too:
//https://www.tutorialsteacher.com/nodejs/serving-static-files-in-nodejs though he'd forgotten to include the / in front of public but thanks to Angela's course, seeing how I set the file path to send forms, I thought I should try adding the forward slash (/)
app.use(express.static(__dirname + '/public')); //Serves resources from public folder

const fsPromises = require('fs').promises; // fs stands for file system
const path = require('path');

const fileOps = async () => {  // this is how you define an async function
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
    console.log(data);
    //console.log('content of starter.txt file: ', data.toString()); //I can write .toString() here OR put 'utf8' after the path in the line above this one
    //await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
  // line commented out directly above this one -- ie. await fsPromises.unlink() -- simply deletes the file, though may want to check that the read was successful before deleting it.
    await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data); // creates the file if it doesn't exist
    await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\nNice to meet you.');
  //await fsPromises.appendfile() creates the file if the file to append to does not exist
    const nameOfFile = 'promiseComplete.txt'; // this variable used in next line; it shows that I can use node to rename files after I've split them by using the split terminal command. Terminal instructions are cryptic
    await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', nameOfFile));
    //await fsPromises.unlink(path.join(__dirname, 'promiseComplete.txt'));
    //above line (await fsPromises.unlink() works, you just need to create the file before you try to run this script
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
    console.log(newData);
    console.log('fileOps done');
  } catch (err) {
      console.log('* * * * * * * * * * readFile threw following error: ' + err);
      console.error(Object.keys(err));
      //console.error(err);
  }
}
console.log('fileOps about to be called');

fileOps();

console.log('fileOps function called');

//app.listen(3000, function() {
  app.listen(process.env.PORT || 3000, function() {
  console.log("listening on port 3000");
});