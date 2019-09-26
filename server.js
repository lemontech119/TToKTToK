const express=require("express");
const path=require("path");
const app=express(); 
const port = 3000;


app.get('/', (req, res) => {
    res.send("test test");
})

app.listen(port, () => {
    console.log('Server listening ...' + port);
})