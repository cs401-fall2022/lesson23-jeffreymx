//I HAVE HIT A WALL IN MY ATTEMPT TO SET UP AND ACCESS A DATABASE.  I CAN
//SET UP AN SQLITE3 DATABASE WITH THE CODE BELOW BUT IT WILL NOT INTEGRATE
//INTO MY HTML PAGE

//credit to https://www.w3resource.com/node.js/nodejs-sqlite.php

console.log("Welcome")

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('blogEntries');

db.serialize(function() {
  db.run("CREATE TABLE blog (type TEXT, entry TEXT)");

  var stmt = db.prepare("INSERT INTO blog VALUES (?,?)");
  
  stmt.run("math", "check out Dimensions");
  stmt.run("robots", "I luv bots");
  stmt.run("cs", "To code or not to code");
  stmt.run("cs", "hello world");
  stmt.run("math", "care for a slice of pi");

  stmt.finalize();

  db.each("SELECT type, entry FROM blog", function(err, row) {
      console.log(row.type+": "+row.entry);
  });
});

db.close();

//CODE ABOVE OR BELOW THIS LINE WORKS IF ONE IS COMMENTED OUT BUT BOTH 
//DO NOT WORK TOGETHER (RUNNING node tryStuff2.js IN THE TERMINAL)

document.getElementById("submit").addEventListener("click", function () {
  document.getElementById("insert").innerHTML = "It works";
  
  //TODO  I NEED TO FIGURE OUT HOW TO CALL THE DB AND PARSE IT FOR ENTRIES 
  
});
console.log("goodbye");
