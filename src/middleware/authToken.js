const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const secret = process.env("JWT_SECRET")

const verifyToken = (req, res, next) => {
	const header = req.header("authorization")

	if (!header) {
		return res.status(400).json( { message: "missing auth token" } )
	}

	// auth = "Bearer eykahsdjahd…"
	const [_, token] = header.split(" ")

	try {
		const verifiedToken = jwt.verify(token, secret)

		const foundUser
		delete foundUser.password

		req.user = foundUser

		next()
	} catch (error) {
		return res.status(400).json({ message: "invalid credentials" })
	}
}

const verifyAdminRole = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({ message: "unauthorized" })
	}
}