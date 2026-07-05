import { Router } from 'express'

import {
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from '../controllers/user.controller.js'
import { adminMiddleware, authMiddleware } from '../middlewares/auth.middleware.js'

export const userRoutes = Router()

userRoutes.use(authMiddleware)
userRoutes.get('/', listUsers)
userRoutes.get('/:id', getUserById)
userRoutes.patch('/:id', updateUser)
userRoutes.delete('/:id', adminMiddleware, deleteUser)
