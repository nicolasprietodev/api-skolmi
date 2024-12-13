import crypto from 'crypto'

export class MatriculaController {
    constructor({ matriculaModel, referidoModel, userModel }) {
        this.matriculaModel = matriculaModel;
        this.referidoModel = referidoModel;
        this.userModel = userModel;

    }

    createMatricula = async (req, res) => {
        try {
            const {
                userId,
                direccion, estado_pago, sexo, estado_civil, documento, nivel_academico, anio_anterior,
                fecha_nacimiento, tipo_sangre, tutor, tel_tutor, rel_tutor, municipio, departamento, codigo
            } = req.body;
    
            if (!userId || isNaN(userId)) {
                return res.status(400).json({ error: "El campo 'userId' es obligatorio y debe ser un número válido." });
            }
    
            const totalCampos = 16;
            const camposLlenos = [
                direccion, estado_pago, sexo, estado_civil, documento, nivel_academico, anio_anterior,
                fecha_nacimiento, tipo_sangre, tutor, tel_tutor, rel_tutor, municipio, departamento
            ].filter(Boolean).length;
    
            const progreso = Math.floor((camposLlenos / totalCampos) * 100);
    
            await this.matriculaModel.createMatricula(
                userId,
                direccion, estado_pago, sexo, estado_civil, documento, nivel_academico, anio_anterior,
                fecha_nacimiento, tipo_sangre, tutor, tel_tutor, rel_tutor, municipio, departamento,
                progreso
            );
    
            if (codigo) {
                const referidor = await this.referidoModel.getReferidorByCodigo(codigo);
                console.log('referido', referidor);
            
                if (referidor) {
                    await this.referidoModel.createReferido(userId, referidor.id_usuario);
                }
            }
    
            if (progreso > 80) {
                const generatedCode = crypto.randomBytes(4).toString("hex").toUpperCase();
                await this.userModel.updateCodigo(userId, generatedCode);
            
            }
    
            res.status(201).json({ message: "Matrícula creada exitosamente", progreso });
        } catch (error) {
            console.error("Error creando matrícula:", error);
            res.status(500).json({ error: "Ocurrió un error al crear la matrícula" });
        }
    }

    getAllMatriculas = async (req, res) => {
        try {
          const user = await this.matriculaModel.getAllMatriculas()
          res.json(user)
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
      }
    
      getMatriculaById = async (req, res) => {
        try {
            const { userId } = req.params;
          const user = await this.matriculaModel.getMatriculaById({ userId })
          res.json(user)
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
      }
      getAllReferidos = async (req, res) => {
        try {
          const referidos = await this.referidoModel.getAllReferidos()
          res.json(referidos)  
        } catch (error) {
            res.status(500).json({ error: error.message})
        }
      }
      getReferidoById = async (req, res) => {
        try {
          const { userId } = req.params;
          const referidos = await this.referidoModel.getReferidoById({ userId })
          res.json(referidos)  
        } catch (error) {
            res.status(500).json({ error: error.message})
        }
      }
     

}
