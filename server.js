const express=require("express");
const path=require("path");
const app=express(); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('dev'));

const member = require("./router/member");

app.use("/member", member);


app.get('/', (req, res) => {
    res.send("test test");
})

app.listen(port, () => {
    console.log('Server listening ...' + port);
});