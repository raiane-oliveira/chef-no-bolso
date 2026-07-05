import bcrypt from 'bcryptjs'

import { User } from '../models/user.model.js'
import { createToken, serializeUser } from '../utils/auth.js'
import { Entregador } from '../models/entregador.model.js'

export async function registerCustomer(request, response) {
  const { name, email, phone, password } = request.body

  if (!name || !email || !password || !phone) {
    return response.status(400).json({ message: 'Name, phone, email and password are required' })
  }

  if (password.length < 6) {
    return response.status(400).json({ message: 'Password must have at least 6 characters' })
  }

  const userAlreadyExists = await User.findOne({ email })

  if (userAlreadyExists) {
    return response.status(409).json({ message: 'Email already registered' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({
    name,
    email,
    phone,
    passwordHash,
    role: 'CUSTOMER',
  })

  return response.status(201).json({ user: serializeUser(user) })
}

export async function registerDelivery(request, response) {
  const { name, email, phone, password } = request.body

  if (!name || !email || !password || !phone) {
    return response.status(400).json({ message: 'Name, phone, email and password are required' })
  }

  if (password.length < 6) {
    return response.status(400).json({ message: 'Password must have at least 6 characters' })
  }

  const userAlreadyExists = await User.findOne({ email })

  if (userAlreadyExists) {
    return response.status(409).json({ message: 'Email already registered' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  let user;
  try {
    user = await User.create({
      name,
      email,
      phone,
      passwordHash,
      role: 'DELIVERY',
    })

    const entregador = await Entregador.create({
      userId: user._id,
      status: 'offline',
      nome: name,
      telefone: phone,
      email: email,
      veiculo: {
        tipo: 'moto'
      },
      ativo: true,
    })

    return response.status(201).json({
      user: serializeUser(user),
      entregador,
    })
  } catch (error) {
    if (user) {
      await User.deleteOne({ _id: user._id })
    }

    console.error('Error registering delivery:', error)
    return response.status(500).json({ message: 'Failed to register delivery' })
  }
}

export async function login(request, response) {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({ message: 'Email and password are required' })
  }

  const user = await User.findOne({ email }).select('+passwordHash')

  if (!user) {
    return response.status(401).json({ message: 'Invalid credentials' })
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash)

  if (!passwordMatches) {
    return response.status(401).json({ message: 'Invalid credentials' })
  }

  return response.json({
    user: serializeUser(user),
    token: createToken(user),
  })
}

export async function me(request, response) {
  const user = await User.findById(request.user.id)

  if (request.user.id !== user.id) {
    return response.status(403).json({ message: 'Access denied' })
  }

  if (!user) {
    return response.status(404).json({ message: 'User not found' })
  }

  return response.json({ user: serializeUser(user) })
}
