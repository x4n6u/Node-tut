require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoute = require('./routes/workouts');

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
 console.log(req.path, req.method);
 next()
});

//routes
app.use('/api/workouts', workoutRoute);

// connect to db
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        //listen for request
        app.listen(process.env.PORT, () => {
        console.log('connecated to db & listening on port ', process.env.PORT );
    });
    })
    .catch((error) => {
        console.log(error);
    });
