import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import usersRouter from './routers/users.routes'
import databaseService from './services/database.services'
databaseService.connect()
const app = express()
app.use(express.json())
const port = 3000
app.use('/users', usersRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
