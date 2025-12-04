import {Router} from 'express';
import octoparseController from '../controllers/octoparse/octoparse.controller';
import authorize from '../../middleware/authorize.middleware';

const router = Router();

router.post('/token', octoparseController.generateToken);
router.post('/token/refresh', octoparseController.refreshToken);

export default router;
