import express from 'express';
import { createMenuItem, deleteMenuItem, getMenuItems, getSingleMenuItem, updateMenuItem } from '../controllers/menuItemController.js';
const router = express.Router();

router.route('/').get(getMenuItems).post(createMenuItem);
router.route('/:id').get(getSingleMenuItem).put(updateMenuItem).delete(deleteMenuItem);

export default router;