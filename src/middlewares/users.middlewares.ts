import { RequestHandler } from 'express'
import { checkSchema } from 'express-validator'
import usersService from '~/services/user.services'
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
      trim: true,
      custom: {
        options: async (value) => {
          const user = await usersService.checkEmailExists(value)
          if (user) {
            throw new Error('Email already exists')
          }
          return true
        }
      }
    },
    password: {
      isLength: {
        options: { min: 6, max: 50 }
      },
      notEmpty: true,
      trim: true,
      isStrongPassword: {
        options: { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
      },
      errorMessage:
        'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    },
    confirm_password: {
      isLength: {
        options: { min: 6, max: 50 }
      },
      notEmpty: true,
      trim: true,
      isStrongPassword: {
        options: { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
      },
      errorMessage:
        'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },
    day_of_birth: {
      isISO8601: { options: { strict: true, strictSeparator: true } },
      notEmpty: true,
      trim: true
    }
  })
)
