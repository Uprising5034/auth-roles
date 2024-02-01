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
router.get("/", verifyAdminRole, getUsers);
router.get("/", getUser);

module.exports = router;
