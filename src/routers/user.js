const express = require("express");
const {
  createUser,
	getUsers,
	getUser
} = require('../controllers/user');
const {
	verifyToken,
	verifyAdminRole
} = require("../middleware/authToken.js")

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/", verifyToken, verifyAdminRole, getUser);

module.exports = router;
