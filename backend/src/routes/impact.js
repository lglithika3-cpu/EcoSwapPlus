import { Router } from 'express';
import EcoImpact from '../models/EcoImpact.js';
import { protect } from '../middleware/auth.js';
const router=Router();
router.get('/me',protect,async(req,res,next)=>{try{res.json(await EcoImpact.findOne({user:req.user.id})||{user:req.user.id,swapsCompleted:0,waterSaved:0,carbonReduced:0,pointsEarned:0})}catch(e){next(e)}});
export default router;
