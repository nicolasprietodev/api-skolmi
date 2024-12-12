import pool from "../connection/pool.js";

export class MatriculaModel {
    

    static async createMatricula (userId,
        direccion, estado_pago, sexo, estado_civil, documento, nivel_academico, anio_anterior,
        fecha_nacimiento, tipo_sangre, tutor, tel_tutor, rel_tutor, municipio,
        departamento){
        const connection = await pool.getConnection()   
        try {

            const [result] = await connection.query(`
                INSERT INTO (id_usuario,
                    direccion, estado_pago, sexo, estado_civil, documento, nivel_academico, anio_anterior,
                    fecha_nacimiento, tipo_sangre, tutor, tel_tutor, rel_tutor, municipio,
                    departamento)
                VALUES
                    (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `,
                [userId, direccion, estado_pago, sexo, estado_civil, documento, nivel_academico, anio_anterior,
                fecha_nacimiento, tipo_sangre, tutor, tel_tutor, rel_tutor, municipio,
                departamento]
            )
            return{
                result
            }
        } catch (error) {
            console.error('Error matricula:', error)
            throw error
        }
    }

}

export const models = {
    MatriculaModel
}