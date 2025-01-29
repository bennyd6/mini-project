const mongoose=require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  FirstName: String,
  LastName: String,
  userName: String,
  password: String,
  email: String,
  phone: String,
  date: { type: Date, default: Date.now }
});

const User=mongoose.model('user',userSchema)
module.exports=User