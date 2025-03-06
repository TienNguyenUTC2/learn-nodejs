import express from 'express'
import { ContextRunner } from 'express-validator'

export const validate = (validations: ContextRunner[]): express.RequestHandler => {
  return async (req, res, next) => {
    try {
      for (const validation of validations) {
        const result = await validation.run(req)
        if (!result.isEmpty()) {
          res.status(400).json({ errors: result.mapped() })
          return
        }
      }
      return next()
    } catch (error) {
      return next(error)
    }
  }
}
