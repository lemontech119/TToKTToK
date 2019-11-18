const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const memberService = require('../services/memberService')


// 로그인 창
router.get("/login", (req, res) =>{
    res.render("member/login.ejs");
})
// 회원가입 창
router.get("/join", (req, res) =>{
    res.render("member/join.ejs");
})

router.get("/mypage", memberService.myPage);
router.post("/login", memberService.loginMember);
router.post("/join", memberService.createMember);
router.get('/logout', memberService.logoutMember);


module.exports = router;
