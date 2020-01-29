const helmet = require('helmet')

exports.SetCSP = (app)=>{
    app.use(helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'"],
          objectSrc : ["'self'" , 'https://accounts.google.com/'],
          styleSrc : ["'self'",'https://fonts.googleapis.com'],
          scriptSrc : ["'self'","'unsafe-inline'"],
          fontSrc : ['https://fonts.gstatic.com']
        }
    }));
} 