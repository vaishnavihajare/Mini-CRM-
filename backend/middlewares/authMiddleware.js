import { verifyToken } from '../utils/jwtUtils.js'

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }

    req.userId = decoded.id
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' })
  }
}