import { Router } from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.get('/:userId', protect, async (req, res, next) => { try { const messages = await Message.find({ $or: [{ sender: req.user.id, receiver: req.params.userId }, { sender: req.params.userId, receiver: req.user.id }] }).sort({ timestamp: 1 }).populate('sender receiver', 'name profileImage'); res.json(messages); } catch (error) { next(error); } });
router.post('/:userId', protect, async (req, res, next) => { try { if (!req.body.content?.trim()) return res.status(400).json({ message: 'Message content is required' }); const message = await Message.create({ sender: req.user.id, receiver: req.params.userId, content: req.body.content.trim() }); res.status(201).json(message); } catch (error) { next(error); } });
export default router;
