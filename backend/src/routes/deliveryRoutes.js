import { Router } from 'express'
import { adminMiddleware, authMiddleware, deliveryMiddleware } from '../middlewares/auth.middleware.js'
import { listDeliveredOrders, listOngoingOrders, finishDelivery, listDeliverers } from '../controllers/delivery.controller.js'

export const deliveryRouter = Router()

deliveryRouter.use(authMiddleware)

deliveryRouter.get('/users', adminMiddleware, listDeliverers)
deliveryRouter.get('/done', deliveryMiddleware, listDeliveredOrders)
deliveryRouter.get('/ongoing', deliveryMiddleware, listOngoingOrders)
deliveryRouter.patch('/:orderId/finish', deliveryMiddleware, finishDelivery)
