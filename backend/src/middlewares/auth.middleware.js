import jwt from 'jsonwebtoken'

export function authMiddleware(request, response, next) {
  const authorization = request.headers.authorization

  if (!authorization) {
    return response.status(401).json({ message: 'Token not provided' })
  }

  const [scheme, token] = authorization.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({ message: 'Invalid token format' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    request.user = {
      id: payload.sub,
      role: payload.role,
    }

    return next()
  } catch {
    return response.status(401).json({ message: 'Invalid token' })
  }
}

export function adminMiddleware(request, response, next) {
  if (request.user?.role !== 'ADMIN') {
    return response.status(403).json({ message: 'Access denied. Admin only.' })
  }

  return next()
}
