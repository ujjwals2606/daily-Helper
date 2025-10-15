import { Router } from 'express';
import passport from 'passport';
import { register, verifyOtp, login, googleCallback } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);

export default router;


