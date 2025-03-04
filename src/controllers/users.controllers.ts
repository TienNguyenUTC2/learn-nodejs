import { Request, RequestHandler, Response } from 'express'
import usersService from '~/services/user.services'

export const loginController: RequestHandler = (req, res) => {
  const { email, password } = req.body
  if (email === 'admin@example.com' && password === '123456') {
    res.status(200).send('login success')
  } else {
    res.status(401).send('login failed')
  }
}

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await usersService.register({ email, password })
    res.status(200).json({ message: 'User created successfully', result })
  } catch (error) {
    console.log('error: ', error)
    res.status(500).json({ error: 'Error' })
  }
}
