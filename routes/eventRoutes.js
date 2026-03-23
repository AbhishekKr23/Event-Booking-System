const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventController");

router.get("/events", controller.getEvents);

module.exports = router;