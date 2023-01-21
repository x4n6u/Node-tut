const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.t9nsuir.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for requests
//app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// routes

app.get('/', (req, res) => {

    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html', {root: __dirname});

    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    // res.render('index', {title: 'Home',blogs});

    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'About'});
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
});



app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
});

// redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

// 404 page
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', {root: __dirname})
    res.status(404).render('404', {title: '404'});
});