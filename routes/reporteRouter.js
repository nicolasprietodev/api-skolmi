import { Router } from 'express';
import { ReporteController } from '../controllers/reporteController.js';

export const createReporteRouter = ({ reporteModel }) => {
  const router = Router()

  const reporteController = new ReporteController({ reporteModel });

  router.get('/reporte', reporteController.generarReporte);
  router.get('/segmentacion', reporteController.segmentarReferidos);
  router.post('/predecir', (req, res) => reporteController.predecirConversion(req,res));
  router.get('/referidos/mensaje/:userId', reporteController.obtenerMensajeReferidos);

  return router;
};  

