import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import api from './routes/api.routes'
import cors from 'cors'
import path from 'path'
const app = express()

//Settings
app.set('port', process.env.PORT || 3001)

//Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))

//Routes
app.use('/api', api)
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

//Static files
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '..', 'build')))

export default app
