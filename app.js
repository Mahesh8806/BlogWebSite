const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const _ = require("lodash");


// *****************************************************************
const app = express();
const port = process.env.PORT || 3000;

const homeStartContent = "What is Node.js? \r Node.js is an open source server environment. Node.js is free. Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)Node.js uses JavaScript on the server...";
const aboutContent = "Name : Bunage Mahesh Prabhakar.\n MobileNo: 8806322064";
const contactContent = "ContactDetails : Arrays are Objects Arrays are a special type of objects. The typeof operator in JavaScript returns 'object' for arrays.But, JavaScript arrays are best described as arrays.Arrays use numbers to access its 'elements'. In this example, person[0] returns John:";
const posts = [];



// *****************************************************************
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// *****************************************************************
app.get('/',(req,res)=>{
    res.render("home.ejs", {homeDetails: homeStartContent,posts : posts });
});

app.get('/about',(req,res)=>{
    res.render("about.ejs", {aboutDetails: aboutContent});
});

app.get('/contact',(req,res)=>{
    res.render("contact.ejs", {contactDetails: contactContent});
});


app.get('/compose',(req,res)=>{
    res.render("compose.ejs");
    
});
app.post('/compose',function(req,res){
    
    const data = {
        title: req.body.postTitle,
        content: req.body.postData
    };
    // console.log(data);

    posts.push(data);
    res.redirect('/');
});
app.get('/delete/:deletePost',function(req,res){
    // const arr;
    const requestDelete =(req.params.deletePost);
    // console.log(requestDelete);

    for(var i = 0 ; i<posts.length ; i++)
    {
        if(requestDelete == posts[i].title)
        {
            console.log("Post Found...")
            posts.splice(i , 1);
            res.redirect('/');
        }
        else{
            console.log('NOt Post Found...');
        }
    }
   

        // const finaltitle = posts.indexOf("day1");
        // console.log(finaltitle);

       
    
});

app.get('/posts/:postName',function(req, res){
    const requestTitle = _.lowerCase(req.params.postName);
    posts.forEach(function(post)
    {
        const storeTitle = _.lowerCase(post.title);

        if(requestTitle === storeTitle)         
        { 
            res.render('posts.ejs',{
                title: post.title,
                 content : post.content,
                });
                requestTitle : requestTitle

        }
    });
})


app.listen(port,function(){
    console.log("Server runs on port : 3000");
});