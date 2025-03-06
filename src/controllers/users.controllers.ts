import { Request, RequestHandler, Response } from 'express'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import { RegisterRequestBody } from '~/models/requests/user.requests'
import usersService from '~/services/user.services'

export const loginController: RequestHandler = (req, res) => {
  const { email, password } = req.body
  if (email === 'admin@example.com' && password === '123456') {
    res.status(200).send('login success')
  } else {
    res.status(401).send('login failed')
  }
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  res.status(200).json({ message: 'User created successfully', result })
}
