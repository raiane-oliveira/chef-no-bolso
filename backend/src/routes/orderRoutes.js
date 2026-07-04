import { Router } from 'express'

import { listOrders, createOrder } from '../controllers/orderController.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const orderRoutes = Router()

orderRoutes.use(authMiddleware)

orderRoutes.get('/', listOrders)
orderRoutes.post('/', createOrder)
