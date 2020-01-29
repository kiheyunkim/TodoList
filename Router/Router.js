const router = require('express');

let Router = (router)=>{
    router.get('/',(request,response,next)=>{
        //next(); -> 이번 라우터에서는 보류

    });

    router.post('/',(request,response,next)=>{
        //next(); -> 이번 라우터에서는 보류
        
    });

    router.get('/test',(request,response)=>{
        console.log('hi');
    })
}

module.exports= Router;