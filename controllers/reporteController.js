import MLR from 'ml-regression-multivariate-linear';

export class ReporteController {
    constructor({ reporteModel }) {
        this.reporteModel = reporteModel;
    }

    generarReporte = async (req, res) => {
        try {
            const reporte = await this.reporteModel.obtenerReporte();
            res.json(reporte);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error generando el reporte");
        }
    };

    segmentarReferidos = async (req, res) => {
        const estado = req.query.estado || 1;
        try {
            const segmentados = await this.reporteModel.segmentarReferidos(
                estado
            );
            res.json(segmentados);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error en la segmentación");
        }
    };
    predecirConversion = async (req, res) => {
        const nuevoReferido = req.body;
    
        try {

            const datos = await this.reporteModel.obtenerDatosParaPrediccion();
            console.log('Datos: ', datos);
            
            const x = datos.map((d) => [
                d.estado_usuario,
                d.valor_incentivo
            ]);
            const y = datos.map((d) => d.convertido);
            console.log("x:", x);
            console.log("y:", y);
            const regresion = new MLR(x, y);
            const xNuevo = [
                nuevoReferido.estado_usuario,
                nuevoReferido.valor_incentivo,
            ];
            const probabilidadDeConversion = regresion.predict(xNuevo);
            res.json({ probabilidad: probabilidadDeConversion });
        } catch (error) {
            console.error("Error prediciendo la conversión", error);
            throw error
            res.status(500).send("Error en el análisis predictivo");
        }
    };
    segmentarReferidos = async (req, res) => {
        const estado = req.query.estado || 1;
        try {
            const segmentados = await this.reporteModel.segmentarReferidos(estado);
            res.json(segmentados);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error en la segmentación');
        }
    }

    obtenerMensajeReferidos = async (req, res) => {
        const { userId } = req.params;
        try {
            const totalReferidos = await this.reporteModel.obtenerNivelReferidos({ userId });
            let mensaje;
            if (totalReferidos > 2) {
                mensaje = "¡Buen trabajo! Sigue así para ganar más premios.";
            } else if (totalReferidos > 0) {
                mensaje = "Recuerda que puedes ganar premios por referir amigos.";
            } else {
                mensaje = "¡Comienza a referir amigos para ganar premios exclusivos!";
            }
            res.json({ totalReferidos, mensaje });
        } catch (error) {
            console.error("Error al obtener mensaje de referidos:", error);
            res.status(500).json({ error: "Error al procesar la solicitud." });
        }
    }


}
