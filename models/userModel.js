export class UserModel {
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
            console.error('Error fetching users',error)
            throw new Error('Error fetching users')
          }
    }

    static async getUserById ({ userId }){
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
            `, [userId])
            return user
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    static async updateUser ({  nombre, correo, telefono, userId, }){
        try {
            
            
            const [result] = await pool.query(`
                UPDATE
                    usuarios
                SET
                    nombre =?,
                    correo =?,
                    telefono =?
                WHERE
                    id_usuario =?
            `, [nombre,
                correo,
                telefono,
                userId])

                if (result.affectedRows === 0) {
                    throw new Error('User not found')
                }

            return {nombre,
                correo,
                telefono,
                userId}

        } catch (error) {
            console.error('Error updating user:', error)
            throw error
        }
    }
}