import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY
const REFRESH_SECRET = process.env.REFRESH_SECRET

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' })
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, SECRET_KEY)
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET)
}