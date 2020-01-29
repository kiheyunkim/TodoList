const CommonRouter = require('express').Router();

CommonRouter.all('/*',(request,response,next)=>{    //이영역은 모든 접근이 세션이 인증 되어있어야함.
    if(request.session.passport === undefined){     //만료 판단
        response.redirect('/');
    }

    next();
})

CommonRouter.get('/logout', function (request, response){
    request.session.destroy((err)=>{
        response.redirect(302,'/');
    })
});

module.exports = CommonRouter;