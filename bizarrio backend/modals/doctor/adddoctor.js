const mongoose=require('mongoose')

const adddoctorschema=new mongoose.Schema({
  profile_pic:{type:Array},
  firstName: {type:String},
  lastName: {type:String},
  address1: {type:String},
  address2: {type:String},
  state: {type:String},
  city: {type:String},
  postal_code: {type:String},
  dateOfBirth: {type:String},
  email: {type:String},
  gender: {type:String},
  password: {type:String},
  qualification:{type:Array},
  medical_specialty:{type:String},
  hospital_association:{type:Array},
  clinic_name:{type:String},
  clinic_address1:{type:String},
  clinic_address2:{type:String},
  clinic_state:{type:String},
  clinic_city:{type:String},
  clinic_postal_code:{type:String},
  clinic_geo_location:{type:String},
  subscription:{type:Array},
  ischangedpassword:{type:Boolean,default:"true"},
},{timestamps:true})


const adddoctormodal=mongoose.model('adddoctor',adddoctorschema)

module.exports=adddoctormodal