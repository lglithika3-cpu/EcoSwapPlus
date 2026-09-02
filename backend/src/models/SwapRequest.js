import mongoose from 'mongoose';
const swapSchema = new mongoose.Schema({ sender:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, receiver:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, offeredItem:{type:mongoose.Schema.Types.ObjectId,ref:'Clothing'}, requestedItem:{type:mongoose.Schema.Types.ObjectId,ref:'Clothing'}, status:{type:String,enum:['pending','accepted','rejected','completed'],default:'pending'}, compatibilityScore:Number },{timestamps:true});
export default mongoose.model('SwapRequest', swapSchema);
