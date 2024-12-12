import { ReporteModel } from '../models/reporteModel.js';

export class ReporteController {

  constructor ({ reporteModel }){
    this.reporteModel= reporteModel;
  }

  static async generarReporte(req, res) {
    try {
      const reporte = await this.reporteModel.obtenerReporte();
      res.json(reporte);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error generando el reporte');
    }
  }

  static async segmentarReferidos(req, res) {
    const estado = req.query.estado || 1;
    try {
      const segmentados = await this.reporteModel.segmentarReferidos(estado);
      res.json(segmentados);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en la segmentación');
    }
  }
}
