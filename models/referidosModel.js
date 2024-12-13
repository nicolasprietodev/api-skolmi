import pool from "../connection/pool.js";

export class ReferidoModel {
    
    static async createReferido(idUsuarioReferido, idUsuarioReferidor) {
        const connection = await pool.getConnection();
        try {
            // Insertar en la tabla `referidos`
            const [referidoResult] = await connection.query(
                `
                INSERT INTO referidos (id_usuario_referido, id_usuario_referidor, estado, fecha_referido)
                VALUES (?, ?, 1, NOW())
                `,
                [idUsuarioReferido, idUsuarioReferidor]
            );
    
            const idReferido = referidoResult.insertId;
    
            // Insertar en la tabla `conversiones`
            const [conversionResult] = await connection.query(
                `
                INSERT INTO conversiones (id_referido, fecha_conversion)
                VALUES (?, NOW())
                `,
                [idReferido]
            );
    
            return { referidoResult, conversionResult };
        } catch (error) {
            console.error("Error en createReferido:", error);
            throw error;
        } finally {
            connection.release();
        }
    }
    

  static async getReferidorByCodigo(codigo) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `
                SELECT id_usuario FROM usuarios WHERE codigo = ?
                `,
        [codigo]
      );
      return rows[0];
    } catch (error) {
      console.error("Error en getReferidorByCodigo:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

}

export const models = {
  ReferidoModel,
};
