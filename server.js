
const express = require('express');
const cors = require('cors');


const messages = require('./app/messages');
const fileDb = require('./fileDB');


const port = 8000;



const app =express();


app.use(express.json());
app.use(cors());


fileDb.init().then(()=>{
    console.log('Database was loaded');

    app.use('/messages',messages());
    app.listen(port, ()=>{
        console.log('server start on port: ' + port);
    });
});