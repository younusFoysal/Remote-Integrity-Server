import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', passport.authenticate('jwt', { session: false }), getUserProfile);

export default router;

