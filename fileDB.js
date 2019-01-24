const fs = require('fs');
const nanoid = require('nanoid');


let data = null;


module.exports={
    init: ()=>{

        return new Promise((resolve,reject) =>{
              fs.readFile('./messages.json',(err, result)=>{
                  if(err) reject();
                    else{
                        data = JSON.parse(result);
                        resolve();
                    }
              })
        });
    },
    getData: () => data.slice(-30),

    getDataByDate: (date)=>{
        const id = data.findIndex(message => message.date === date);
        if(id>=0){
            return data.slice(id+1);
        }
        else{
            return null;
        }
    },

    addMessage: (message) => {
        message.id = nanoid(8);
        message.date = new Date().toISOString();
        data.push(message);


        let contents = JSON.stringify(data, null, 2);

        return new Promise((resolve, reject) =>{
            fs.writeFile('./messages.json', contents, err =>{
                if(err) reject();
                else{
                    resolve(message);
                }
            });
        });
    }

};