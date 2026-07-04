import { Category } from '../models/categoryModel.js'
import { Product } from '../models/productModel.js'
import { Coupon } from '../models/couponModel.js'
import { User } from '../models/user.model.js'
import { Order } from '../models/orderModel.js'

export async function seedData() {
  const categoriesCount = await Category.countDocuments()

  if (categoriesCount > 0) return

  const categories = await Category.insertMany([
    { name: 'Dindins Gourmets' },
    { name: 'Dindins Tradicionais' },
    { name: 'Dindins Especiais' },
    { name: 'Promoções' },
  ])

  const products = await Product.insertMany([
    { name: 'Dindin de Ninho com Nutella', description: 'Delicioso dindin gourmet com leite Ninho e Nutella cremosa.', price: 12, imageUrl: 'https://picsum.photos/400/400?random=1', category: categories[0]._id, featured: true },
    { name: 'Dindin de Paçoca', description: 'Dindin cremoso com paçoca tradicional brasileira.', price: 8, imageUrl: 'https://picsum.photos/400/400?random=2', category: categories[0]._id, featured: true },
    { name: 'Dindin de Maracujá', description: 'Refrescante dindin de maracujá com pedaços da fruta.', price: 7, imageUrl: 'https://picsum.photos/400/400?random=3', category: categories[0]._id, featured: true },
    { name: 'Dindin de Leite Condensado', description: 'O clássico dindin de leite condensado, cremoso e irresistível.', price: 6, imageUrl: 'https://picsum.photos/400/400?random=4', category: categories[1]._id },
    { name: 'Dindin de Coco', description: 'Dindin de coco fresco com leite condensado.', price: 6, imageUrl: 'https://picsum.photos/400/400?random=5', category: categories[1]._id },
    { name: 'Dindin de Morango', description: 'Dindin sabor morango com leite condensado.', price: 6, imageUrl: 'https://picsum.photos/400/400?random=6', category: categories[1]._id },
    { name: 'Dindin de Oreo', description: 'Dindin gourmet com pedaços de biscoito Oreo.', price: 10, imageUrl: 'https://picsum.photos/400/400?random=7', category: categories[2]._id },
    { name: 'Dindin de Churros', description: 'Dindin sabor churros com canela e doce de leite.', price: 10, imageUrl: 'https://picsum.photos/400/400?random=8', category: categories[2]._id },
    { name: 'Dindin de Café', description: 'Dindin cremoso com café especial e leite condensado.', price: 9, imageUrl: 'https://picsum.photos/400/400?random=9', category: categories[2]._id },
  ])

  await Coupon.insertMany([
    { code: 'BEMVINDO10', discount: 10, active: true },
    { code: 'FRETEGRATIS', discount: 0, active: true },
  ])

  const customers = await User.find({ role: 'CUSTOMER' }).limit(2)

  if (customers.length >= 2) {
    const orders = [
      {
        user: customers[0]._id,
        items: [
          { product: products[0]._id, name: products[0].name, price: products[0].price, quantity: 2, observation: 'Sem açúcar extra' },
          { product: products[3]._id, name: products[3].name, price: products[3].price, quantity: 1 },
        ],
        deliveryType: 'entrega',
        deliveryAddress: 'Rua das Flores, 123 - Centro',
        deliveryFee: 5,
        subtotal: 30,
        total: 35,
        status: 'delivered',
        createdAt: new Date('2025-06-20T14:30:00'),
      },
      {
        user: customers[0]._id,
        items: [
          { product: products[6]._id, name: products[6].name, price: products[6].price, quantity: 3 },
        ],
        deliveryType: 'retirada',
        subtotal: 30,
        total: 30,
        status: 'ready',
        createdAt: new Date('2025-06-25T10:15:00'),
      },
      {
        user: customers[1]._id,
        items: [
          { product: products[1]._id, name: products[1].name, price: products[1].price, quantity: 2 },
          { product: products[2]._id, name: products[2].name, price: products[2].price, quantity: 1 },
          { product: products[4]._id, name: products[4].name, price: products[4].price, quantity: 2 },
        ],
        deliveryType: 'entrega',
        deliveryAddress: 'Av. Brasil, 456 - Jardim América',
        deliveryFee: 8,
        subtotal: 34,
        total: 42,
        status: 'preparing',
        coupon: 'BEMVINDO10',
        discount: 3.4,
        createdAt: new Date('2025-07-01T18:45:00'),
      },
      {
        user: customers[1]._id,
        items: [
          { product: products[8]._id, name: products[8].name, price: products[8].price, quantity: 1 },
          { product: products[5]._id, name: products[5].name, price: products[5].price, quantity: 2 },
        ],
        deliveryType: 'consumo-no-local',
        subtotal: 21,
        total: 21,
        status: 'pending',
        createdAt: new Date('2025-07-03T09:00:00'),
      },
    ]

    await Order.insertMany(orders)
  }

  console.log('Seed data inserted: categories, products, coupons, and orders')
}
