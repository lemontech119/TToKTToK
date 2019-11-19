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
// const mysql = require('mysql');
// const conn = require("dbconnection.js");
// const connection = mysql.createConnection(conn);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('dev'));

app.use(express.static('public'));

app.use(cookieparser());
app.use(session({
    secret: '1A@W#E$E',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.use(routes)

// app.use(function(err, req, res, next){
//     let sql = "delete from ttokttok.reservation where date_reserve < now()";
//     connection.query(sql, function(err, rows){
//         if(!err){
//             console.log("예약시간이 지난 경우 제거")
//         }
//     })
//     next();
// })


app.listen(port, () => {
    console.log('Server listening ...' + port);
});