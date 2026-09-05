import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import clothingRoutes from './routes/clothing.js';
import swapRoutes from './routes/swaps.js';
import impactRoutes from './routes/impact.js';
import messageRoutes from './routes/messages.js';
import leaderboardRoutes from './routes/leaderboard.js';
import adminRoutes from './routes/admin.js';
import wishlistRoutes from './routes/wishlist.js';
import reviewRoutes from './routes/reviews.js';
const app=express();
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://127.0.0.1:5173').split(',').map(origin => origin.trim());
app.use(cors({ origin: (origin, callback) => !origin || allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error('CORS origin not allowed')), credentials:true }));
app.use(express.json({limit:'2mb'})); app.use(morgan('dev')); app.use('/uploads',express.static('uploads'));
app.get('/api/health',(_,res)=>res.json({ok:true,service:'EcoSwap+ API'}));
app.use('/api/auth',authRoutes); app.use('/api/clothing',clothingRoutes); app.use('/api/swaps',swapRoutes); app.use('/api/impact',impactRoutes);
app.use('/api/messages',messageRoutes); app.use('/api/leaderboard',leaderboardRoutes); app.use('/api/admin',adminRoutes);
app.use('/api/wishlist',wishlistRoutes); app.use('/api/reviews',reviewRoutes);
app.use((err,_req,res,_next)=>{console.error(err);res.status(err.status||500).json({message:err.message||'Server error'})});
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
async function startServer() {
  try {
    if (!mongoUri) {
      throw new Error('MONGO_URI or MONGODB_URI is not configured');
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
    app.listen(port, '0.0.0.0', () => {
      console.log(`EcoSwap+ API listening on ${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}
startServer();
export default app;