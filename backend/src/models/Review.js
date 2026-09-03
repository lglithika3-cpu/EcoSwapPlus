import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({ reviewer:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, seller:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, item:{type:mongoose.Schema.Types.ObjectId,ref:'Clothing'}, exchange:{type:mongoose.Schema.Types.ObjectId,ref:'SwapRequest'}, rating:{type:Number,required:true,min:1,max:5}, comment:{type:String,trim:true,maxlength:500} },{timestamps:true});
reviewSchema.index({ reviewer:1, exchange:1 }, { unique:true, sparse:true });
export default mongoose.model('Review', reviewSchema);
