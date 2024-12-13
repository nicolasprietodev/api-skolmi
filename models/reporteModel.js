import pool from "../connection/pool.js";

export class ReporteModel {
  static async obtenerReporte() {
    const connection = await pool.getConnection();
    try {
      const [referidos] = await connection.query(`
          SELECT r.id_usuario_referidor, COUNT(r.id_referido) AS totalReferidos,
            SUM(CASE WHEN c.id_conversion IS NOT NULL THEN 1 ELSE 0 END) AS conversiones
          FROM referidos r
          LEFT JOIN conversiones c ON r.id_referido = c.id_referido
          GROUP BY r.id_usuario_referidor
        `);
      return referidos;
    } catch (error) {
      console.error("Error obteniendo el reporte");
      throw error;
    } finally {
      connection.release();
    }
  }

  static async segmentarReferidos(estado) {
    const connection = await pool.getConnection();
    try {
      const [segmentados] = await connection.query(
        `
          SELECT r.id_usuario_referidor, COUNT(r.id_referido) AS totalReferidos
          FROM referidos r
          WHERE r.estado = ?
          GROUP BY r.id_usuario_referidor
        `,
        [estado]
      );
      return segmentados;
    } catch (error) {
      console.error("Error segmentando referidos");
      throw error;
    } finally {
      connection.release();
    }
  }

  static async obtenerNivelReferidos({ userId }) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `
              SELECT COUNT(*) AS totalReferidos
              FROM referidos
              WHERE id_usuario_referidor = ? AND estado = 1
          `,
        [userId]
      );
      return result[0].totalReferidos;
    } catch (error) {
      console.error("Error al obtener referidos:", error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

export const models = {
  ReporteModel,
};
