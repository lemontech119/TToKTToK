const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);

router.get("/append", (req, res)=>{

    res.render("append.ejs");
})


module.exports = router;