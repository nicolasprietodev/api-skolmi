export const {
    SALT_ROUNDS = 10,
    JWT_TOKEN = 'kike',
    COOKIE_OPTIONS = {
        maxAge: 60 * 60 * 1000, 
        httpOnly: true, 
        secure: true,
        sameSite: 'lax'
      }
} = process.env