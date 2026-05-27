import { Router } from 'express';
import { HealthController } from './health.controller.js';

const router = Router();
const healthController = new HealthController();

router.get('/', healthController.check);

export const healthRoutes: Router = router;
