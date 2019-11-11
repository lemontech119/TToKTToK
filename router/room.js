const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const roomService = require('../services/roomService')

router.get("/list", roomService.readRooms)
router.get("/:roomId", roomService.readRoom)
router.post("/reservation", roomService.reservation)

module.exports = router;