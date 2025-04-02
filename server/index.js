import express from 'express'
import cors from 'cors'
import dbConnect from './db/index.js'
import authRouter from './routes/authRoutes.js'
import testimonialRouter from './routes/testimonialRoutes.js'
import config from './config.js'
import auth from './auth/index.js'

const app = express()
app.use(cors(config.corsConfig))
app.use(express.json())
app.use(express.urlencoded({ extend: true }))
auth(app)
app.use(authRouter)
app.use(testimonialRouter)

dbConnect(app)

