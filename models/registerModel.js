import { SALT_ROUNDS } from '../config/config.js'
import pool from '../connection/pool.js'
import bcrypt from 'bcrypt'


export class RegisterModel {
  static async createUser ({ nombre, correo, password, roleId }) {
    const connection = await pool.getConnection()

    console.log('Datos enviados a la consulta SQL', {
      nombre,
      correo,
      password,
      roleId,
    });
    
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      console.log('password', hashedPassword)
      const [result] = await connection.query(
        `INSERT INTO usuarios (nombre, correo, password,
                id_rol, estado_usuario) VALUES (?,?,?,?,?)`,
        [nombre, correo, hashedPassword, roleId, 1]
      )
      return {
        id: result.insertId,
        nombre,
        correo,
        roleId,
      }
    } catch (error) {
      console.error('Error creating user')
      throw error
    }
  }

  static async getUser () {
    try {
      const [users] = await pool.query(`
        SELECT * FROM usuarios
      `)
      return users
    } catch (error){
      console.error('Error fetching users')
      throw new Error('Error fetching users')
    }
  }
}

export const models = {
  RegisterModel
}