const { PrismaClientKnownRequestError } = require("@prisma/client")
const { 
	createUserDb,
	getUsersDb
} = require('../domains/user.js')

const createUser = async (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  try {
    const createdUser = await createUserDb(username, password)

    return res.status(201).json({ user: createdUser })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "A user with the provided username already exists" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

const getUsers = async (req, res) => {
	try {
		const users = await getUsersDb()
		return res.json({ users })
	} catch (error) {
		return res.json({ error: "something went wrong" })
	}
}

module.exports = {
  createUser,
	getUsers
}
