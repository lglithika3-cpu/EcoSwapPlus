import { Router } from 'express';
import User from '../models/User.js';
const router = Router();
router.get('/', async (_req, res, next) => { try { res.json(await User.find({}, 'name location ecoPoints badge profileImage').sort({ ecoPoints: -1 }).limit(100)); } catch (error) { next(error); } });
export default router;
