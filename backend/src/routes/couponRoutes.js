import { Router } from 'express'

import { validateCoupon } from '../controllers/couponController.js'

export const couponRoutes = Router()

couponRoutes.post('/validate', validateCoupon)
