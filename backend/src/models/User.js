import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({ name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true}, password:{type:String,required:true,select:false}, location:String, profileImage:String, role:{type:String,enum:['user','admin'],default:'user'}, ecoPoints:{type:Number,default:0}, badge:{type:String,default:'Eco Beginner'} },{timestamps:true});
export default mongoose.model('User', userSchema);
