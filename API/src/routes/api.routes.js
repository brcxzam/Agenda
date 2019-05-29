import { Router } from 'express'
import graphqlHTTP from 'express-graphql'
import { unlink } from 'fs'
import multer from 'multer'
import { extname, join } from 'path'
import uuid from 'uuid/v4'
import root from '../graphql/root'
import schema from '../graphql/schema'
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
	multer({ storage }).single('profile_image'),
	async ({ body, file }, res) => {
		if (body.deleteImage) {
			deleteImg(body)
		}
		res.json({ profile_image: file.filename })
	}
)

router.post('/upload/delete', ({ body }, res) => {
	deleteImg(body)
	res.json({ message: true })
})

export default router