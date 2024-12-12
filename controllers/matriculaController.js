
export class MatriculaController {
    constructor ({matriculaModel}){
        this.matriculaModel = matriculaModel;
    }

   createMatricula = async (req, res) => {
    try {
        const { direccion, estado_pago, sexo, estado_civil, documento, nivel_academico, anio_anterior,
            fecha_nacimiento, tipo_sangre, tutor, tel_tutor, rel_tutor, municipio, departamento, codigo
        } = req.body


    } catch (error) {
        
    }
   }

}
