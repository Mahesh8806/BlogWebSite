const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const _ = require("lodash");


// *****************************************************************
const app = express();
const port = process.env.PORT || 3000;

const homeStartContent = "What is Node.js? \r Node.js is an open source server environment. Node.js is free. Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)Node.js uses JavaScript on the server...";
const aboutContent ="This Website is developed by using nodejs html, css, and one of the javascript templating library ejs(Embedded JavaScipt) to render html code in easy and clean way.";
const contactContent = { 
    name: "Bunage Mahesh Prabhakar.", 
    mobileNo: "MobileNO : 8806322064.",
    mailId: "maheshbunage2000@gmail.com"};
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
    const requestDelete =_.lowerCase(req.params.deletePost);
    console.log(requestDelete);

    for(var i = 0 ; i<posts.length ; i++)
    {
        if(requestDelete == _.lowerCase(posts[i].title))
        {
            console.log("Post Found...")
            console.log(posts[i].title)
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