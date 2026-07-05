import mongoose from 'mongoose'

import { User } from '../models/user.model.js'
import { serializeUser } from '../utils/auth.js'
import { Entregador } from '../models/entregador.model.js'

function isValidUserId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

export async function listUsers(_request, response) {
  const users = await User.find().sort({ createdAt: -1 })

  return response.json({ users: users.map(serializeUser) })
}

export async function getUserById(request, response) {
  const { id } = request.params

  if (!isValidUserId(id)) {
    return response.status(400).json({ message: 'Invalid user id' })
  }

  const user = await User.findById(id)

  if (!user) {
    return response.status(404).json({ message: 'User not found' })
  }

  return response.json({ user: serializeUser(user) })
}

export async function updateUser(request, response) {
  const { id } = request.params
  const { name, email } = request.body

  if (!isValidUserId(id)) {
    return response.status(400).json({ message: 'Invalid user id' })
  }

  const data = {}

  if (name) data.name = name
  if (email) data.email = email

  if (email) {
    const emailAlreadyInUse = await User.findOne({ email, _id: { $ne: id } })

    if (emailAlreadyInUse) {
      return response.status(409).json({ message: 'Email already registered' })
    }
  }

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    return response.status(404).json({ message: 'User not found' })
  }

  return response.json({ user: serializeUser(user) })
}

export async function deleteUser(request, response) {
  const { id } = request.params

  if (!isValidUserId(id)) {
    return response.status(400).json({ message: 'Invalid user id' })
  }

  const user = await User.findByIdAndDelete(id)
  if (user.role === 'DELIVERY') {
     await Entregador.findOneAndDelete({ userId: user._id })
  }

  if (!user) {
    return response.status(404).json({ message: 'User not found' })
  }

  return response.status(204).send()
}
