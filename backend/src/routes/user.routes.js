import { Router } from 'express'

import {
  createCustomer,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const userRoutes = Router()

userRoutes.post('/', createCustomer)

userRoutes.use(authMiddleware)
userRoutes.get('/', listUsers)
userRoutes.get('/:id', getUserById)
userRoutes.patch('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
