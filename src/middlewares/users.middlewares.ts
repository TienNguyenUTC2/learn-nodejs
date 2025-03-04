import { RequestHandler } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

export const loginValidator: RequestHandler = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).send('username and password are required')
    return
  }
  next()
}
export const registerValidator = validate(
  checkSchema({
    name: {
      isLength: {
        options: { min: 1, max: 100 }
      },
      notEmpty: true,
      trim: true,
      isString: true
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      notEmpty: true,
      trim: true
    },
    password: {
      isLength: {
        options: { min: 6, max: 50 }
      },
      notEmpty: true,
      trim: true,
      isStrongPassword: {
        options: { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
      }
    },
    confirm_password: {
      isLength: {
        options: { min: 6, max: 50 }
      },
      notEmpty: true,
      trim: true
    },
    day_of_birth: {
      isISO8601: { options: { strict: true, strictSeparator: true } },
      notEmpty: true,
      trim: true
    }
  })
)
