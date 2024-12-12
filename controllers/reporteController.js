import { ReporteModel } from '../models/reporteModel.js';

class ReporteController {
  static async generarReporte(req, res) {
    try {
      const reporte = await ReporteModel.obtenerReporte();
      res.json(reporte);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error generando el reporte');
    }
  }

  static async segmentarReferidos(req, res) {
    const estado = req.query.estado || 1;
    try {
      const segmentados = await ReporteModel.segmentarReferidos(estado);
      res.json(segmentados);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en la segmentación');
    }
  }
}

export default ReporteController;
