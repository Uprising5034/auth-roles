const express = require("express");
const {
  createUser,
	getUsers,
	getUser
} = require('../controllers/user');

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/", getUser);

module.exports = router;
