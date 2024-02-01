const { PrismaClientKnownRequestError } = require("@prisma/client")
const { 
	createUserDb,
	getUsersDb,
	getUserDb
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
		delete createdUser.passwordHash
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
		const usersRaw = await getUsersDb()
		const users = usersRaw.map(user => {
				delete user.passwordHash
				return user
			})
		return res.json({ users })
	} catch (error) {
		return res.json({ error: "something went wrong" })
	}
}

const getUser = async (req, res) => {
	const { username } = req.body
	try {
		const user = await getUserDb(username)
		return res.json({ user })
	} catch (error) {
		return res.status(500).json({ error })
	}
}

module.exports = {
  createUser,
	getUsers,
	getUser
}
