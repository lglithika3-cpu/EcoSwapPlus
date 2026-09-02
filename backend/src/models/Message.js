import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({ sender:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, receiver:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, content:{type:String,required:true,trim:true}, timestamp:{type:Date,default:Date.now} });
export default mongoose.model('Message', messageSchema);
