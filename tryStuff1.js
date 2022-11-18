//I HAVE HIT A WALL IN MY ATTEMPT TO SET UP AND ACCESS A DATABASE.  I CAN
//SET UP AN SQLITE3 DATABASE WITH THE CODE BELOW BUT IT WILL NOT INTEGRATE
//INTO MY HTML PAGE

//credit to https://www.linode.com/docs/guides/getting-started-with-nodejs-sqlite/

console.log("Welcome")

//THIS PART BREAKS MY CODE AND WILL NOT CONTINUE EXECUTING IN THE BROWSER
var sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./blogs.db', sqlite3.OPEN_READWRITE, (err) =>{
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
        } else if (err) {
            console.log("Getting error " + err);
            exit(1);
    }
    runQueries(db);
});

function createDatabase() {
    var newdb = new sqlite3.Database('blogs.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });
};

function createTables(newdb) {
    newdb.exec(`
    create table blog (
        entry_num int primary key AUTOINCREMENT,
        blog_type text not null,
        blog_text text not null
    );
    insert into blog (blog_type, blog_text)
        values ('math', 'I love math'),
               ('cs', 'I love cs'),
               ('robots', 'I love robots'),
               ('math', 'I love math too');
    `, ()  => {
        runQueries(newdb);
    });
    
};

console.log("midterm check");

function runQueries(db) {
    db.each(`SELECT entry_num, blog_type, blog_text FROM blog`, function(err, row) {
        if(row.blog_type === "math"){
            console.log(row.entry_num + " " + row.blog_text);
        }
    });
};

//THIS PART BREAKS THE TERMINAL AND WILL NOT SHOW ME MY DATABASE
//WHEN COMMENTED OUT THE DATABASE RUNS FINE. (RUNNING node tryStuff.js IN THE TERMINAL)

document.getElementById("submit").addEventListener("click", function () {
    document.getElementById("insert").innerHTML = "It works";
    
    //I NEED TO FIGURE OUT HOW TO CALL THE DB AND PARSE IT FOR ENTRIES.
    //IN THEORY I WOULD USE THE blog_type TO DETERMINE WHICH PARTS OF THE 
    //DATABASE TO LOAD UNDER EACH SECTION

    /*
    db.each(`SELECT entry_num, blog_type, blog_text FROM blog`, function(err, row) {
        if (row.entry_type==="robots"){
            console.log("woooh");
            document.getElementById("insert").innerHTML = row.blog_text;
        }
    });
    */
});

console.log("bye bye")