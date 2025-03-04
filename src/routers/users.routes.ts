import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)

/**
 * description: Register a new user
 * path: /users/register
 * method: POST
 * body: {name:string, email: string, password: string ,day_of_birth: ISO, confirm_password: string}
 */
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter
