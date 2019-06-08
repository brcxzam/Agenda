import { Router } from 'express'
import graphqlHTTP from 'express-graphql'
import { unlink } from 'fs'
import multer from 'multer'
import { extname, join } from 'path'
import uuid from 'uuid/v4'
import config from '../graphql/jwt/jwt.config'
import root from '../graphql/root'
import schema from '../graphql/schema'
import { User } from './../database/model'
const jwt = require('express-jwt')
const router = Router()

const storage = multer.diskStorage({
	destination: join(__dirname, '..', '..', 'public', 'profile_images'),
	filename: (req, file, cb, filename) => {
		cb(null, uuid() + extname(file.originalname))
	},
})

function deleteImg({ deleteImage }) {
	unlink('public/profile_images/' + deleteImage, function(err) {
		if (err) console.log(err)
	})
}

router.post(
	'/',
	graphqlHTTP((request, response, graphQLParams) => ({
		schema: schema,
		rootValue: root,
		context: {
			request: request,
		},
	}))
)

router.post(
	'/upload',
	jwt({ secret: config.secret }),
	multer({ storage }).single('profile_image'),
	async ({ user, file }, res) => {
		const id = user.user
		const { profile_image } = await User.findByPk(id)
		if (profile_image != 'default.png') {
			deleteImg({ deleteImage: profile_image })
		}
		await User.update(
			{ profile_image: file.filename },
			{
				where: {
					id,
				},
			}
		)
		res.json({ profile_image: file.filename })
	}
)

router.post(
	'/upload/delete',
	jwt({ secret: config.secret }),
	async ({ user }, res) => {
		const id = user.user
		const { profile_image } = await User.findByPk(id)
		if (profile_image != 'default.png') {
			deleteImg({ deleteImage: profile_image })
		}
		await User.update(
			{ profile_image: 'default.png' },
			{
				where: {
					id,
				},
			}
		)
		res.json({ message: 'default.png' })
	}
)

export default router
