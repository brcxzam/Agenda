import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../../database/model'
import config from '../jwt/jwt.config'

export default {
	login: async ({ data }) => {
		const { email, password } = data
		const user = await User.findOne({
			where: {
				email,
			},
		})
		if (user) {
			const res = await bcrypt.compare(password, user.password)
			if (res) {
				const token = jwt.sign({ user: user.id }, config.secret)
				return token
			}
		}
		return 'false'
	},
}
