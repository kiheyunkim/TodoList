const LoginRouter = require('express').Router();
const passport = require('passport');

LoginRouter.get('/',(request,response)=>{       //세션 만료 파악
    if(request.session.passport === undefined){
        response.redirect('/login/google');
    }else{
        response.redirect('/todoList.html');
    }
});

LoginRouter.get('/google',
    passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.email'],
        accessType: 'offline',  prompt: 'select_account'}),//approvalPrompt: 'force'
(req, res)=>{ }
// The request will be redirected to Google for authentication, so this
// function will not be called.
);

LoginRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/loginfail' }),
    (request, response)=>{
    response.redirect("/todoList.html");
});





module.exports = LoginRouter;