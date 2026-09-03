import { Router } from 'express';
import Review from '../models/Review.js';
import SwapRequest from '../models/SwapRequest.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.get('/seller/:sellerId', async (req,res,next) => { try { res.json(await Review.find({seller:req.params.sellerId}).populate('reviewer','name profileImage').sort({createdAt:-1})); } catch (error) { next(error); } });
router.post('/', protect, async (req,res,next) => { try { const {seller,item,exchange,rating,comment} = req.body; if (!seller || !rating || !Number.isInteger(Number(rating)) || Number(rating)<1 || Number(rating)>5) return res.status(400).json({message:'Seller and a rating from 1 to 5 are required'}); if (exchange) { const completed = await SwapRequest.exists({_id:exchange,status:'completed',$or:[{sender:req.user.id},{receiver:req.user.id}]}); if (!completed) return res.status(403).json({message:'Reviews require a completed exchange'}); } res.status(201).json(await Review.create({reviewer:req.user.id,seller,item,exchange,rating:Number(rating),comment})); } catch (error) { if (error.code === 11000) return res.status(409).json({message:'You already reviewed this exchange'}); next(error); } });
export default router;
