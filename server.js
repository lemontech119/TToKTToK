const express=require("express");
const path=require("path");
const app=express(); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const port = 3000;
const routes = require('./router')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('dev'));

app.use(cookieparser());
app.use(session({
    secret: '1A@W#E$E',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.use(routes)


app.listen(port, () => {
    console.log('Server listening ...' + port);
});