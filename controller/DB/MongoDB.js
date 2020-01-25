const mongoose = require('mongoose');

module.exports=()=>{
    const connect = ()=>{
        if(process.env.NODE_ENV !=='production'){
            mongoose.set('debug',true);           
        }       
        mongoose.connect('mongodb://root:toor@localhost:27017/admin', 
            {dbName:'nodejs'},
            (err)=>{
                if(err){
                    console.log('mongoDB connection success : ',err)
                }else{
                    console.log('mongoDB connection success');
                }
            })
    };

    connect();
    mongoose.connection.on('error',(error)=>{
        console.err('mongoDB Error ',error);
    });

    mongoose.connection.on('disconnected',()=>{
        console.err('mongoDB disconnected. trying to reconnect');
        connect();
    });

    //collection 생성
    require('./collection/doListSchema');
}