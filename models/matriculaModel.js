export class MatriculaModel {
    static async getAllUsers (){

        try {
            const [users] = await pool.query(`
                SELECT 
                    u.id_usuario,
                    u.nombre,
                    u.correo,
                    u.telefono,
                    u.fecha_registro,
                    u.estado_usuario,
                    r.rol AS rol_usuario,
                    c.nombre_curso AS curso
                FROM
                    usuarios u
                LEFT JOIN
                    roles_usuario r 
                ON
                    u.id_rol = r.id_rol
                LEFT JOIN
                    cursos c 
                ON
                u.id_curso = c.id_curso;

            `)
            return users
          } catch (error){
            console.error('Error fetching users')
            throw new Error('Error fetching users')
          }
    }


    static async getUserById ({ idUser }){
        try {
            const [user] = await pool.query(`
                SELECT 
                    u.id_usuario,
                    u.nombre,
                    u.correo,
                    u.telefono,
                    u.fecha_registro,
                    u.estado_usuario,
                    r.rol AS rol_usuario,
                    c.nombre_curso AS curso
                FROM
                    usuarios u
                LEFT JOIN
                    roles_usuario r 
                ON
                    u.id_rol = r.id_rol
                LEFT JOIN
                    cursos c 
                ON
                    u.id_curso = c.id_curso
                WHERE
                    u.id_usuario =?
            `, [id])
            return user
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    static async updateUser ({ idUser, updatedUser }){
        try {
            const [result] = await pool.query(`
                UPDATE
                    usuarios
                SET
                    nombre =?,
                    correo =?,
                    telefono =?,
                    password =?,
                WHERE
                    id_usuario =?
            `, [updatedUser.nombre,
                updatedUser.correo,
                updatedUser.telefono,
                updatedUser.password,
                idUser])

                if (result.affectedRows === 0) {
                    throw new Error('User not found')
                }

            return {nombre,
                correo,
                telefono,
                password,
                idUser}

        } catch (error) {
            console.error('Error updating user:', error)
            throw error
        }
    }
}

export const models = {
    MatriculaModel
}