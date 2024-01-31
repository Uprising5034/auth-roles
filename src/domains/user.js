const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password) => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6)
  }
})

const getUsersDb = async () => await prisma.user.findMany()

const getUserDb = async (username) => await prisma.user.findUnique({
	where: {
		username
	}
})

module.exports = {
  createUserDb,
	getUsersDb,
	getUserDb
}
