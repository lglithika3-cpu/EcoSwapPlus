import mongoose from 'mongoose';
const clothingSchema = new mongoose.Schema({ title:{type:String,required:true}, description:String, category:{type:String,required:true}, brand:String, size:String, condition:String, estimatedValue:{type:Number,required:true}, image:String, location:String, owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, status:{type:String,enum:['available','reserved','swapped'],default:'available'} },{timestamps:true});
export default mongoose.model('Clothing', clothingSchema);
