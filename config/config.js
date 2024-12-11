export const {
    SALT_ROUNDS = 10,
    JWT_TOKEN = 'kike',
    COOKIE_OPTIONS = {
        maxAge: 60 * 60 * 1000, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      }
} = process.env