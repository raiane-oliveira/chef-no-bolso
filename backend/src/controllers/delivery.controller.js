import { Entregador } from '../models/entregador.model.js'
import { Order } from '../models/orderModel.js'

export async function listDeliverers(request, response) {
  const { page = 1, limit = 20 } = request.query

  const filter = {}

  const skip = (Number(page) - 1) * Number(limit)
  let sort = { createdAt: -1 }

  const [entregadores, total] = await Promise.all([
    Entregador.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Entregador.countDocuments(filter),
  ])

  return response.json({
    entregadores,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  })
}

export async function listDeliveredOrders(request, response) {
  const entregador = await Entregador.findOne({ userId: request.user.id })

  if (!entregador) {
    return response.status(404).json({ message: 'Entregador not found' })
  }

  const orders = await Order.find({
    deliveryPerson: entregador._id,
    status: 'entregue',
  })
    .sort({ createdAt: -1 })
    .populate('items.product', 'name imageUrl price')
    .populate('user', 'name email')

  return response.json({ orders })
}

export async function listOngoingOrders(request, response) {
  const entregador = await Entregador.findOne({ userId: request.user.id })

  if (!entregador) {
    return response.status(404).json({ message: 'Entregador not found' })
  }

  const orders = await Order.find({
    deliveryPerson: entregador._id,
    status: { $in: ['pendente', 'a_caminho'] },
  })
    .sort({ createdAt: -1 })
    .populate('items.product', 'name imageUrl price')
    .populate('user', 'name email')

  return response.json({ orders })
}

export async function finishDelivery(request, response) {
  const { orderId } = request.params

  const entregador = await Entregador.findOne({ userId: request.user.id })

  if (!entregador) {
    return response.status(404).json({ message: 'Entregador not found' })
  }

  const order = await Order.findOne({
    _id: orderId,
    deliveryPerson: entregador._id,
  })

  if (!order) {
    return response.status(404).json({ message: 'Order not found' })
  }

  if (order.status === 'entregue') {
    return response.status(400).json({ message: 'Order already delivered' })
  }

  order.status = 'entregue'
  order.deliveredAt = new Date()

  await order.save()

  return response.json({ order })
}
