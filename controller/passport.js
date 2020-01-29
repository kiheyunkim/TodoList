const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

let Addpassport = (app)=>{
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new googleStrategy({
        clientID: '---',
        clientSecret: '---',
        callbackURL: 'http://localhost:3000/login/google/callback'
    },
    (accessToken, refreshToken, profile, done)=> {      //로그인 되는 순간에 불러온다.
        // asynchronous verification, for effect...
        process.nextTick( ()=>{
          // To keep the example simple, the user's Google profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Google account with a user record in your database,
          // and return that user instead.
          return done(null, profile.emails);
        });
    }));

    passport.serializeUser((user,done)=>{//값을 가져올떄(로그인 직후의 상황)
        done(null,user);
    });

    passport.deserializeUser((user,done)=>{//세션에 저장된 값을 가져올 때
        console.log('called');
        done(null,user);
    });

    app.get('/login',(request,response)=>{
        console.log(request.session);
        if(request.session.login===undefined){
            response.redirect('/login/google');
        }else{
            if(request.session.login === false){
                response.redirect('/login/google');
            }else{
                response.redirect("/todoList.html");
            }
        }
    });

    app.get('/login/google',
        passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/userinfo.email'],
            accessType: 'offline',  prompt: 'select_account'}),//approvalPrompt: 'force'
    (req, res)=>{    }
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
    );

    app.get('/login/google/callback',
    passport.authenticate('google', { failureRedirect: '/loginfail' }),
    (req, res)=>{
        req.session.login=true;
        res.redirect("/todoList.html");
    });
    let count = 0;
    app.get('/logout', function (request, res){
        console.log(request.session);
        request.session.login=false;
        console.log(request.session.passport.user);
        request.logout();
        res.redirect("/");
    });
}

exports.Addpassport = Addpassport;