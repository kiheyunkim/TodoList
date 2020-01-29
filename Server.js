const express = require('express');
const passport = require('./controller/passport');
const mysqlSession = require('./controller/Session/session')
const csp = require('./controller/CSP/csp');
//const routers = require('./Router/Router');
const app = express();

//Set Json Use
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Set CSP(Contents Security Policy)
csp.SetCSP(app);

//Set Mysql Session
mysqlSession.AddMysqlSession(app);

//https://github.com/jaredhanson/passport/issues/14#issuecomment-4863459
app.use(express.static(__dirname +'/public'));  //passport보다 밑에 있으면 deserialize를 호출한다(잘못된 동작)

passport.Addpassport(app);

app.listen('3000',()=>console.log('Server Start'));
app.on('exit',()=>{
  console.log('bye');
  sessionStore.close();
});