import { Router } from 'express';
import ReporteController from '../controllers/reporteController.js';

const createReporteRouter = () => {
  const router = Router();
  router.get('/reporte', ReporteController.generarReporte);
  router.get('/segmentacion', ReporteController.segmentarReferidos);

  return router;
};
export default createReporteRouter;

