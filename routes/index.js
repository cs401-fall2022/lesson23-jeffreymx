var express = require('express');
const { BlockList } = require('net');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = new sqlite3.Database('jsmBlogs.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.log("Getting error " + err);
      exit(1);
    }
    //Query if the table exists if not lets create it on the fly!
    db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='blog'`,
      (err, rows) => {
        if (rows.length === 1) {
          console.log("Table exists!");
          db.all(` select blog_id, blog_type, blog_txt from blog`, (err, rows) => {
            console.log("returning " + rows.length + " records");
            res.render('index', { title: 'Jeff\'s Blog', data: rows });
          });
        }
        else {
          console.log("Creating table and inserting some sample data");
          db.exec(`create table blog (
                   blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
                   blog_type text NOT NULL,
                   blog_txt text NOT NULL);
                   insert into blog (blog_type, blog_txt)
                   values ('math','You should check out these cool videos.  I especially like video 5 about complex numbers.  www.youtube.com/playlist?list=PL97CCC2CC4E89C7E5'),
                          ('compSci', 'Computer Science has been a long time coming in my life.  It all started over 20 years ago with my first html course.'),
                          ('robots','Time to get ready for kickoff!  The 2023 game reveal is January 7!!!!');`,
            () => {
              db.all(` select blog_id, blog_type, blog_txt from blog`, (err, rows) => {
                res.render('index', { title: 'Jeff\'s Blog', data: rows });
              });
            });
        }
      });
  });
});

router.post('/add', (req, res, next) => {
  if (req.body.password==="correct"){
    var db = new sqlite3.Database('jsmBlogs.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          console.log("Getting error " + err);
          exit(1);
        }
        console.log("inserting " + req.body.newPost);
        // APOSTROPHES FROM THE USER CRASH THE DB SO I CONVERT AND STORE THEM AS DOUBLE STARS
        var input = req.body.newPost;
        var sanitized = input.replace('\'', '\*\*');
        db.exec(`insert into blog (blog_type, blog_txt)
                  values ('${req.body.topic}', '${sanitized}');`);
      }
    );
  }
  else{
    console.log("it seems you have the wrong password");
  }
  //redirect to homepage
  res.redirect('/');
})

//TODO - figure out how to edit an entry
router.post('/update', (req, res, next) => {
  if (req.body.password==="correct"){
    var db = new sqlite3.Database('jsmBlogs.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          console.log("Getting error " + err);
          exit(1);
        }
        console.log("updating " + req.body.editPost);
        // APOSTROPHES FROM THE USER CRASH THE DB SO I CONVERT AND STORE THEM AS DOUBLE STARS
        var input = req.body.editPost;
        var sanitized = input.replace('\'', '\*\*');
        var math = 'math';
        db.exec(`update blog set blog_txt = '${sanitized}' where blog_id = '${req.body.blogNumber}';`);
      }
    );
  }
  else{
    console.log("it seems you have the wrong password");
  }
  //redirect to homepage
  res.redirect('/');
})

router.post('/delete', (req, res, next) => {
  if (req.body.protected==="correct"){
    console.log(req.body.protected + "wow");
    var db = new sqlite3.Database('jsmBlogs.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      console.log("deleting " + req.body.blog);
      //EACH BLOG HAS ITS OWN DELETE BUTTON SO NO UNSANITIZED USER ENTRY
      db.exec(`delete from blog where blog_id='${req.body.blog}';`);     
    }
    );
  }
  else{
    console.log("deletion is password protected");
  }
  res.redirect('/');
})

module.exports = router;
