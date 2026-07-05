import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { connectDatabase } from './config/database.js'
import { authRoutes } from './routes/auth.routes.js'
import { userRoutes } from './routes/user.routes.js'
import { productRoutes } from './routes/productRoutes.js'
import { categoryRoutes } from './routes/categoryRoutes.js'
import { orderRoutes } from './routes/orderRoutes.js'
import { couponRoutes } from './routes/couponRoutes.js'
import { seedDefaultUser } from './database/seed-default-user.js'
import { seedData } from './database/seedData.js'
import { deliveryRouter } from './routes/deliveryRoutes.js'

const app = express()
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json())

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/orders', orderRoutes)
app.use('/coupons', couponRoutes)
app.use('/deliveries', deliveryRouter)

async function bootstrap() {
  await connectDatabase()
  await seedDefaultUser()
  await seedData()

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
