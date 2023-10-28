const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const index = require('./routes/index');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');
const taskRoute = require('./routes/taskRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/', index);
app.use('/user', userRoute);
app.use('/task', taskRoute);


// // catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(5001,()=>{
    console.log('server listening')
})