const mongoose=require('mongoose')
const { Schema } = mongoose;

const farmerSchema = new Schema({
  FirstName: String,
  LastName: String,
  phone: String,
  password: String,
  email: String,
  date: { type: Date, default: Date.now }
});

const Farmer=mongoose.model('farmer',farmerSchema)
module.exports=Farmer