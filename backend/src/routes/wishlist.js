import { Router } from 'express';
import Wishlist from '../models/Wishlist.js';
import Clothing from '../models/Clothing.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.get('/', protect, async (req,res,next) => { try { res.json(await Wishlist.find({user:req.user.id}).populate({path:'item',populate:{path:'owner',select:'name location profileImage'}}).sort({createdAt:-1})); } catch (error) { next(error); } });
router.post('/:itemId', protect, async (req,res,next) => { try { if (!await Clothing.exists({_id:req.params.itemId,status:'available'})) return res.status(404).json({message:'Available item not found'}); res.status(201).json(await Wishlist.create({user:req.user.id,item:req.params.itemId})); } catch (error) { if (error.code === 11000) return res.status(409).json({message:'Item is already in your wishlist'}); next(error); } });
router.delete('/:itemId', protect, async (req,res,next) => { try { await Wishlist.findOneAndDelete({user:req.user.id,item:req.params.itemId}); res.status(204).end(); } catch (error) { next(error); } });
export default router;
