import pool from "../connection/pool.js";

export class ReferidoModel {
    static async createReferido(idUsuarioReferido, idUsuarioReferidor) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query(
                `
                INSERT INTO referidos (id_usuario_referido, id_usuario_referidor, estado, fecha_referido)
                VALUES (?, ?, 1, NOW())
                `,
                [idUsuarioReferido, idUsuarioReferidor]
            );
            return { result };
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
    ReferidoModel
}