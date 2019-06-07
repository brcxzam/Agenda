import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Academic_data, Percentage, User } from '../../database/model'
import config from '../jwt/jwt.config'
import verify from '../jwt/verify'
const saltRounds = 10

async function encrypt(password) {
	if (password.length < 8 || password.length > 60) {
		throw new Error('invalid password size')
	}
	const salt = await bcrypt.genSalt(saltRounds)
	const hash = await bcrypt.hash(password, salt)
	return hash
}

export default {
	cUser: async ({ data }) => {
		const { password } = data
		data.password = await encrypt(password)
		const user = await User.create(data)
		const { id } = user
		await Academic_data.create({ user: id })
		await Percentage.create({ partial: 1, percent: 20, academic: id })
		await Percentage.create({ partial: 2, percent: 20, academic: id })
		await Percentage.create({ partial: 3, percent: 20, academic: id })
		await Percentage.create({ partial: 4, percent: 40, academic: id })
		const token = jwt.sign({ user: user.id }, config.secret)
		return token
	},
	user: async (_, { request }) => {
		const id = verify(request)
		const user = await User.findByPk(id)
		return user
	},
	uUser: async ({ data }, { request }) => {
		const id = verify(request)
		const { password } = data
		if (password) {
			data.password = await encrypt(password)
		}
		await User.update(data, {
			where: {
				id,
			},
		})
		return 'done'
	},
	dUser: async (_, { request }) => {
		const id = verify(request)
		await User.destroy({
			where: {
				id,
			},
		})
		return 'done'
	},
}
