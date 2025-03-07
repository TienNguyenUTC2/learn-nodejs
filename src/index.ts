import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routers/users.routes'
import databaseService from './services/database.services'
const app = express()
app.use(express.json())
const port = 3000
app.use('/users', usersRouter)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message })
})
databaseService.connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
