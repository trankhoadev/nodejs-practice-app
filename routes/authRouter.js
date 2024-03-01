const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth/auth.controller");

router.post("/login", authCtrl.postLogin);
router.post("/register", authCtrl.postCreateAccount);

module.exports = router;
