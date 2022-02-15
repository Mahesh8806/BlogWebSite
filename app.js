const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const _ = require("lodash");


// *****************************************************************
const app = express();

const homeStartContent = "Arrays are Objects Arrays are a special type of objects. The typeof operator in JavaScript returns 'object' for arrays.But, JavaScript arrays are best described as arrays.Arrays use numbers to access its 'elements'. In this example, person[0] returns John:";
const aboutContent = "Name : Bunage Mahesh Prabhakar. MobileNo: 8806322064";
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
    console.log(data)

    posts.push(data);
    res.redirect('/')
})



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
                requestTitle : requestTitle
            });

        }
    });
})


app.listen('3000',function(){
    console.log("Server runs on port : 3000");
});