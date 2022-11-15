//This gets the new entries when I click submit.  In order to work my password must match "correct"
//TODO I need to figure out how to store the entries in a database and also display them when the page loads.
//There should be a way to save them to the data base here.
//I should also be able to loop through the database and print blog entries based on their topic.
document.getElementById("submit").addEventListener("click", function () {
    var password = document.getElementById("password").value;
    if (password ==="correct"){
        document.getElementById("wrongPass").innerHTML = "";
        var topic = document.getElementById("topic").value;
        if (topic === "math"){
            document.getElementById("chooseTopic").innerHTML = "";
            var newPost = document.getElementById("newPost").value;
            document.getElementById("mathBlog").innerHTML = newPost;
        }
        else{
            if (topic === "robots"){
                document.getElementById("chooseTopic").innerHTML = "";
                var newPost = document.getElementById("newPost").value;
                document.getElementById("robotBlog").innerHTML = newPost;
            }
            else{
                if (topic === "compSci"){
                    document.getElementById("chooseTopic").innerHTML = "";
                    var newPost = document.getElementById("newPost").value;
                    document.getElementById("csBlog").innerHTML = newPost;
                }
                else{
                    document.getElementById("chooseTopic").innerHTML = "please pick a topic";
                }
            }
        }
    }
    else {
        document.getElementById("wrongPass").innerHTML = "sorry wrong password";
    }
});