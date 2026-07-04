import { Order } from '../models/orderModel.js'

export async function listOrders(request, response) {
  const filter = {}

  if (request.user.role !== 'ADMIN') {
    filter.user = request.user.id
  }

  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .populate('items.product', 'name imageUrl price')
    .populate('user', 'name email')

  return response.json({ orders })
}

export async function createOrder(request, response) {
  const { items, deliveryType, deliveryAddress, subtotal, total, deliveryFee, coupon, discount } = request.body

  if (!items || items.length === 0) {
    return response.status(400).json({ message: 'Order must have at least one item' })
  }

  if (!deliveryType) {
    return response.status(400).json({ message: 'Delivery type is required' })
  }

  const order = await Order.create({
    user: request.user.id,
    items,
    deliveryType,
    deliveryAddress,
    deliveryFee: deliveryFee || 0,
    subtotal,
    total,
    coupon,
    discount: discount || 0,
  })

  return response.status(201).json({ order })
}
