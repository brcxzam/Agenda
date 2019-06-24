import jwt from 'jsonwebtoken'
import config from './jwt.config'

export default function verify(req) {
	let token = req.headers['authorization']
	if (!token) {
		throw new Error('signature required')
	}
	token = token.replace('Bearer ', '')
	try {
		const decoded = jwt.verify(token, config.secret)
		return decoded.user
	} catch (err) {
		throw new Error('invalid signature')
	}
}
