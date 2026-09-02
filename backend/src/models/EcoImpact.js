import mongoose from 'mongoose';
const impactSchema = new mongoose.Schema({ user:{type:mongoose.Schema.Types.ObjectId,ref:'User',unique:true}, swapsCompleted:{type:Number,default:0}, waterSaved:{type:Number,default:0}, carbonReduced:{type:Number,default:0}, pointsEarned:{type:Number,default:0} });
export default mongoose.model('EcoImpact', impactSchema);
