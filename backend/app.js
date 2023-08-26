const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
const hbs = require('hbs');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
require('./database/db');
const app = express();
dotenv.config();
app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended: false}))
const User = require('./model/signup');
const Book = require('./model/book')
const views_path = path.join(__dirname, "..", "views");
app.use(express.static('views_path'));
app.set("view engine", "hbs");
const PORT = process.env.PORT || 5000
app.get("/", (req, res) => {
    res.render("index");
});
app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const Email = await User.findOne({email:email})
    if (!Email) {
        res.send('Email not Registered');
        return
    }
    try {
        if (req.body.psw=='Admin?iiitu' && req.body.email=='admin@iiitu.ac.in') {
            res.render("uploadBook");
        }
        else if(password==Email.password)
        {
            res.render('book'); 
        }
        else{
            res.send("Wrong Password");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
app.get("/login", (req, res) => {
    res.render("login");
});
app.post('/signup', async(req,res)=>{
    const password = req.body.password;
    const psw_repeats = req.body.psw_repeat;
    try {
        if (password!==psw_repeats) {
            res.render('signup',{
                succcess: `<div style="background: rgba(244, 67, 54,0.3);" class="suc"><span style="color: #f44336;" class="success"><i class="bi bi-bag-x"></i></i> Password Not Matching</span></div>`
            })
        }
        
        else{
            console.log("jds");
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            psw: password,
            psw_repeat: psw_repeats,
        })
        // console.log("hgj");
        const Registered = await user.save();
        res.render('signup',{
            succcess: `<div style="background: rgba(33, 154, 83,0.3);" class="suc"><span style="color: #04AA6D;" class="success"><i class="bi bi-check-circle-fill"></i> Signed Up Sucessfully</span></div>`
        })
    }
    } catch (error) {
        res.status(400).send(error);
    }
})
app.get("/signup", (req, res) => {
    res.render("signup");
});
app.post('/upload', async(req,res)=>{
    try {
        const book = new Book({
            name: req.body.name,
            author: req.body.author,
            category: req.body.category,
            book: req.body.book,

        })
        const Registered = await book.save();
        res.render('uploadBook',{
            succcess: `<div style="background: rgba(33, 154, 83,0.3);" class="suc"><span style="color: #04AA6D;" class="success"><i class="bi bi-check-circle-fill"></i> Book Uploaded Sucessfully</span></div>`
        })
    } catch (error) {
        res.status(400).send(error);
    }
})
app.get("/upload", (req, res) => {
    res.render("uploadBook");
});
//Passing Body data
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is up and runing ${PORT}`);
});