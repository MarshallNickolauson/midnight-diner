import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { deleteUser, getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from '../controllers/userController.js';

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile).delete(protect, deleteUser);

export default router;