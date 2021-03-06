const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
//const app = require('express')();

let Addpassport = (app)=>{
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new googleStrategy({
        clientID: '586489203795-rkd4q62t9rciad7s60nkau9tmh127qk9.apps.googleusercontent.com',
        clientSecret: 'EE_TNDmTgAlWddBraSoH7Q3g',
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
}

exports.Addpassport = Addpassport;