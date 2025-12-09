import {Router} from 'express';
import OAuthController from '../controllers/oauth/oauth.controller';
import authorize from '../../middleware/authorize.middleware';

const router = Router();

// Octoparse OAuth Routes
router.post('/octoparse/token', OAuthController.generateToken);
router.post('/octoparse/token/refresh', OAuthController.refreshToken);

// GHL OAuth Routes
router.get('/ghl/authUri', OAuthController.authUri);
router.get('/callback', OAuthController.ghlCallback);
// router.post('/ghl/token/refresh', OAuthController.ghlRefreshToken);

router.get('/ghl/authDetails', OAuthController.getGHLAuthDetails);

export default router;
