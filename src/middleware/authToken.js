require('dotenv').config()

const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const secret = process.env["JWT_SECRET"];
const { getUser } = require("../controllers/user.js");

const verifyToken = (req, res, next) => {
	const header = req.header("authorization")

	if (!header) {
		return res.status(400).json( { message: "missing auth token" } )
	}

	// auth = "Bearer eykahsdjahd…"
	const [_, token] = header.split(" ")

	try {
		const verifiedToken = jwt.verify(token, secret)
		if (!verifiedToken) {
			return res.status(401).json({ error: "unauthorized"})
		}

		const foundUser = getUser(req, res)
		if (foundUser) {
			req.user = foundUser
			next()
		}

	} catch (error) {
		return res.status(400).json({ message: "invalid credentials" })
	}
}

const verifyAdminRole = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({ message: "unauthorized" })
	}

	if (req.user.role !== "ADMIN") {
		return res.status(403).json({ message: "you don't have admin priviledges"})
	}

	next()
}

module.exports = { verifyToken, verifyAdminRole }