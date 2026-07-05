import { Router } from 'express'

import { login, me, registerCustomer, registerDelivery } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const authRoutes = Router()

authRoutes.post('/register/customer', registerCustomer)
authRoutes.post('/register/deliverer', registerDelivery)
authRoutes.post('/login', login)
authRoutes.get('/me', authMiddleware, me)
