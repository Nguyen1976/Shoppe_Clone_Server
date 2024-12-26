const express = require("express");
const router = express.Router();
const userService = require("../services/userService.js");

router.post("/sign-up", userService.createUser);

module.exports = router;