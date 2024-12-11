import pool from "../connection/pool.js";

export class LoginModel {
  static async getCorreo(correo) {
    try {
      const [rows] = await pool.query(
        `
                SELECT correo, password, id_rol
                FROM usuarios
                WHERE correo = ?`,
        [correo]
      );
      if (rows.length === 0) {
        throw new Error("Correo no encontrado");
      }

      const user = rows[0];
      return {
        correo: user.correo,
        password: user.password,
        id_rol: user.id_rol,
      };
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  }
  static async validatePassword (plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
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
    LoginModel
  }