const adddoctormodal = require('../../modals/doctor/adddoctor')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cloudinary=require('cloudinary').v2
const fs=require('fs')
const path=require('path')

require('dotenv')



require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


const add_doctor = async (req, res) => {
    try {
    const {firstName,lastName,address1,address2,state,city,postal_code,dateOfBirth,email,gender,password,
        qualification,medical_specialty,hospital_association,clinic_name,clinic_address1,
        clinic_address2,clinic_state,clinic_city,clinic_postal_code,clinic_geo_location,subscription} = req.body;
   
            const profileimage=[]
      
               if (req.files) {
            // Upload files to Cloudinary and get the URLs
            for (let file of req.files) {
              const result = await cloudinary.uploader.upload(file.path);
              profileimage.push(result.secure_url);  // Store the URL of the uploaded image
              // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
              // fs.unlinkSync(file.path);
            }
          }

      const exitingprofile=await adddoctormodal.findOne({email:email})
      if(exitingprofile)
      {
        res.status(400).send({message:"This Email id already exist..."})
        return
      }
        const hashedPassword = await bcrypt.hash(password, 10);

      const new_add_doctor = new adddoctormodal({
      firstName,lastName,address1,address2,state,city,postal_code,dateOfBirth,email,gender,password:hashedPassword,
        qualification,medical_specialty,hospital_association,clinic_name,clinic_address1,
        clinic_address2,clinic_state,clinic_city,clinic_postal_code,clinic_geo_location,subscription,profile_pic:profileimage
      });
  
      // Save the deal to the database
      const resp = await new_add_doctor.save();
      res.status(200).send({ message: 'Doctor Profile added successfully', doctor: resp });
  
    } catch (error) {
      console.error('Error adding doctor profile:', error);
      res.status(500).send({ message: 'Error occurred while adding doctor profile', error: error.message });
    }
  };

 const updatedoctor = async (req, res) => {
  try {
    const id = req.params._id;
 
    // Find existing doctor data
    const existingDoctor = await adddoctormodal.findById(id);

    let profileimage = existingDoctor.profile_pic; // default to existing images

    if (req.files && req.files.length > 0) {
      profileimage = []; // reset only if new files are uploaded
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        profileimage.push(result.secure_url);
        // Optionally delete file from server
        // fs.unlinkSync(file.path);
      }
    }

    const updatedata = { ...req.body, profile_pic: profileimage };

    const resp = await adddoctormodal.findByIdAndUpdate(id, updatedata, { new: true,upsert: true });

    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};





const logindoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adddoctormodal.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ID not found" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(400).json({ message: "Password not matched" });
    }

    if (user.ischangedpassword) {
      return res.status(403).json({ message: "Please change your password first" });
    }

    const payload = {
      id: user._id,
      firstName: user.firstName,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        // id: user._id,
        // email: user.email,
        // name: user.firstName,
        user
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await adddoctormodal.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send("Old password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.ischangedpassword = false; // Optional: reset the flag
    await user.save();

    res.status(200).send("Password changed successfully");
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).send("Internal Server Error");
  }
};


const viewdoctor=async(req,res)=>
{
  try {
    const resp=await adddoctormodal.find()
    res.status(200).send({message:"data fetch",doctor:resp})
    
  } catch (error) {
    console.log(error);
    
  }
}

const viewdoctorby_id=async(req,res)=>
{
  try {
    const id=req.params._id
 
    const resp=await adddoctormodal.findById({_id:id})
    res.status(200).send({message:"data fetch",doctor:resp})
    
  } catch (error) {
    console.log(error);
    
  }
}


  module.exports={add_doctor,logindoctor,changePassword,viewdoctor,updatedoctor,viewdoctorby_id}