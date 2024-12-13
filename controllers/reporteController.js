import LinearRegression from 'ml-regression-simple-linear';
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
            const x = datos.map((d) => [
                new Date(d.fecha_registro).getTime(),
                d.estado_usuario,
                d.valor_incentivo,
            ]);
            const y = datos.map((d) => d.convertido);
            const regresion = new LinearRegression(x, y);
            const xNuevo = [
                new Date(nuevoReferido.fecha_registro).getTime(),
                nuevoReferido.estado_usuario,
                nuevoReferido.valor_incentivo,
            ];
            const probabilidadDeConversion = regresion.predict(xNuevo);
            res.json({ probabilidad: probabilidadDeConversion });
        } catch (error) {
            console.error("Error prediciendo la conversión", error);
            res.status(500).send("Error en el análisis predictivo");
        }
    };
}
