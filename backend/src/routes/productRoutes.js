import { Router } from 'express'

import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js'

export const productRoutes = Router()

productRoutes.get('/', listProducts)
productRoutes.get('/:id', getProductById)
productRoutes.post('/', authMiddleware, adminMiddleware, createProduct)
productRoutes.put('/:id', authMiddleware, adminMiddleware, updateProduct)
productRoutes.delete('/:id', authMiddleware, adminMiddleware, deleteProduct)
