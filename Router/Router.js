let Router = (router)=>{
    router.get('/',(request,response,next)=>{
        //next(); -> 이번 라우터에서는 보류

    });

    router.post('/',(request,response,next)=>{
        //next(); -> 이번 라우터에서는 보류
        
    });
}

exports.Router = Router;