const express = require('express');
const router = express.Router();


const fileDb = require('../fileDB');

const createRouter = ()=>{

    router.get('/:date', (req, res)=>{
        if(req.params.date){
            res.send(fileDb.getDataByDate(req.params.date));
        }
        else{
            res.send({message: 'error'});
        }
    });


    router.get('/', (req, res) =>{
        res.send(fileDb.getData());
    });

    router.post('/', (req, res)=>{
       const message = req.body;
       if(message.author.length >0 && message.message.length>0){
           fileDb.addMessage(message).then(result =>{
               res.send(result);
           })
       }
       else{
           res.send({message: 'Error'});
       }
    });



    return router;
};


module.exports = createRouter;