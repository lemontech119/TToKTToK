const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);
const adminService = require("../services/adminService")


router.get("/", (req, res)=>{
    res.render("admin/login.ejs");
})
router.get("/append", (req, res)=>{
    res.render("admin/append.ejs");
})


router.post("/login", adminService.loginAdmin);
router.post("/append", adminService.createConference);

module.exports = router;