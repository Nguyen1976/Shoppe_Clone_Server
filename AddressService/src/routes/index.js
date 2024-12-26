const express = require("express");
const router = express.Router();
const userService = require("../services/AddressService.js");

router.post("/create-address", userService.createAddress);

module.exports = router;
