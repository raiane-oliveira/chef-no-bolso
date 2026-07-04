import bcrypt from 'bcryptjs'

import { User } from '../models/user.model.js'

export async function seedDefaultUser() {
  const users = [
    { name: 'Cliente 1', email: 'cliente1@email.com', password: '123456', role: 'CUSTOMER' },
    { name: 'Cliente 2', email: 'cliente2@email.com', password: '123456', role: 'CUSTOMER' },
    { name: 'Admin', email: 'admin@email.com', password: '123456', role: 'ADMIN' },
  ]

  for (const userData of users) {
    const userAlreadyExists = await User.findOne({ email: userData.email })
    if (userAlreadyExists) continue

    const passwordHash = await bcrypt.hash(userData.password, 10)

    await User.create({
      name: userData.name,
      email: userData.email,
      passwordHash,
      role: userData.role,
    })
  }
}
