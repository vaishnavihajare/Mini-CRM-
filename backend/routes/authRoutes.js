import express from 'express'
import { authController } from '../controllers/authController.js'
import { validateRegistration, validateLogin } from '../middlewares/validator.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', validateRegistration, authController.register)
router.post('/login', validateLogin, authController.login)
router.get('/me', authenticate, authController.getMe)

export default router