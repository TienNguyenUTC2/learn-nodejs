import express from 'express'
import usersRouter from './routers/users.routes'
import databaseService from './services/database.services'
const app = express()
app.use(express.json())
const port = 3000
app.use('/users', usersRouter)
databaseService.connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
