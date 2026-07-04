import bcrypt from 'bcryptjs'

import { User } from '../models/user.model.js'
import { createToken, serializeUser } from '../utils/auth.js'

export async function register(request, response) {
  const { name, email, password } = request.body

  if (!name || !email || !password) {
    return response.status(400).json({ message: 'Name, email and password are required' })
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
    passwordHash,
    role: 'CUSTOMER',
  })

  return response.status(201).json({ user: serializeUser(user) })
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

  if (!user) {
    return response.status(404).json({ message: 'User not found' })
  }

  return response.json({ user: serializeUser(user) })
}
