import pool from "../connection/pool.js";

export class MatriculaModel {
    static async createMatricula(
        userId,
        direccion, estado_pago, sexo, estado_civil, documento, nivel_academico, anio_anterior,
        fecha_nacimiento, tipo_sangre, tutor, tel_tutor, relacion_tutor, municipio,
        departamento, progreso
    ) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query(
                `
                INSERT INTO Matricula (
                    id_usuario, direccion, estado_pago, sexo, estado_civil, documento, nivel_academico,
                    anio_anterior, fecha_nacimiento, tipo_sangre, tutor, tel_tutor, relacion_tutor, municipio,
                    departamento, progreso
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    userId, direccion, estado_pago, sexo, estado_civil, documento, nivel_academico,
                    anio_anterior, fecha_nacimiento, tipo_sangre, tutor, tel_tutor, relacion_tutor, municipio,
                    departamento, progreso
                ]
            );
            return { result };
        } catch (error) {
            console.error("Error en createMatricula:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getAllMatriculas() {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query(`SELECT 
                 id_usuario, direccion, estado_pago, sexo, estado_civil, documento, nivel_academico,
                    anio_anterior, fecha_nacimiento, tipo_sangre, tutor, tel_tutor, relacion_tutor, municipio,
                    departamento, progreso
                    FROM Matricula`);
            return result 
        } catch (error) {
            console.error("Error en getAllMatriculas:", error);
            throw error;
        } finally {
            connection.release();
        }
    }
}


export const models = {
    MatriculaModel
}