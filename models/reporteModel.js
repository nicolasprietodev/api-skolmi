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

    static async obtenerDatosParaPrediccion() {
        const connection = await pool.getConnection();
        try {
            const [datos] = await connection.query(
                ` SELECT 
                r.id_usuario_referidor, r.id_usuario_referido, u.fecha_registro, u.estado_usuario, i.tipo_incentivo, i.valor_incentivo, c.id_conversion 
                IS NOT NULL AS convertido 
                FROM referidos r 
                JOIN usuarios u ON r.id_usuario_referido = u.id_usuario 
                LEFT JOIN conversiones c ON r.id_referido = c.id_referido 
                LEFT JOIN incentivos i ON r.id_usuario_referidor = i.id_usuario_referidor `
            );
            return datos;
        } catch (error) {
            console.error("Error obteniendo datos", error);
            throw error;
        } finally {
            connection.release();
        }
    }
}

export const models = {
    ReporteModel,
};
