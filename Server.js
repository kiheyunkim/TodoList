const express = require('express');
const session = require('express-session');

const passport = require('./controller/passport');
const routers = require('./Router/Router');

const app = express();
const router = express.Router();

//Set Public Dir
app.use(express.static(__dirname+'/public'));

//add Google oauth2.0
passport.Addpassport(app,router);
//Add Express Router
routers.Router(router);
//add session
app.use(session({
        resave:false,
        saveUninitialized:true,//세션 아이디 고정
        secret:'1234456789',
        cookie:{
            httpOnly : true,
            secure : false
        }
}));
//Set Json Use
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen('3000',()=>console.log('Server Start'));