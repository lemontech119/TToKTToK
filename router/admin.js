const express = require('express');
const router = express.Router();
const fs = require('fs')
const multer = require('multer')
const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);
const adminService = require("../services/adminService")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
            console.log("이미지 파일 체크 완료");
            cb(null, "public/images")
        }else{
            res.send("이미지 파일만 가능합니다.")
        }
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get("/", (req, res)=>{
    res.render("admin/login.ejs");
})
router.get("/append", (req, res)=>{
    res.render("admin/append.ejs");
})


router.post("/login", adminService.loginAdmin);
router.post("/append", upload.single('file'), adminService.createConference);

module.exports = router;