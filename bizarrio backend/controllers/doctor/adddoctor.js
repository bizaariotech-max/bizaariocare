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


const addimagegallary = async (req, res) => {
  try {
    const id = req.params._id;

    // Find existing doctor data
    const existingDoctor = await adddoctormodal.findById(id);

    if (!existingDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const imagegallary = existingDoctor.image_gallary || []; // default to empty if not set

    const newimage = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        newimage.push(result.secure_url);

        // Optionally delete file from local server
        // fs.unlinkSync(file.path);
      }
    }

    // FIX: Spread new images instead of nesting
    const updatedata = { 
      ...req.body, 
      image_gallary: [...imagegallary, ...newimage] 
    };

    const resp = await adddoctormodal.findByIdAndUpdate(
      id, 
      updatedata, 
      { new: true, upsert: true }
    );

    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


const deleteimagefromgallary = async (req, res) => {
  try {
    const id = req.params._id;
    const index = parseInt(req.params.index, 10);

    // Find existing doctor data
    const existingDoctor = await adddoctormodal.findById(id);

    if (!existingDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (
      isNaN(index) ||
      index < 0 ||
      index >= existingDoctor.image_gallary.length
    ) {
      return res.status(400).json({ message: "Invalid index" });
    }

    // Remove the image at that index
    const deletedImage = existingDoctor.image_gallary[index];
    existingDoctor.image_gallary.splice(index, 1);

    // Save updated document
    await existingDoctor.save();

    res.status(200).json({
      message: "Image deleted successfully",
      deletedImage,
      updatedDoctor: existingDoctor,
    });
  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


const addupcomingevents = async (req, res) => {
  try {
    const id = req.params._id;

    // Find existing doctor data
    const existingDoctor = await adddoctormodal.findById(id);

    if (!existingDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const upcoming_events = existingDoctor.upcoming_events || []; // default to empty if not set

    const newimage = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        newimage.push(result.secure_url);

        // Optionally delete file from local server
        // fs.unlinkSync(file.path);
      }
    }

    // FIX: Spread new images instead of nesting
    const updatedata = { 
      ...req.body, 
      upcoming_events: [...upcoming_events, ...newimage] 
    };

    const resp = await adddoctormodal.findByIdAndUpdate(
      id, 
      updatedata, 
      { new: true, upsert: true }
    );

    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


const deleteupcomingevents = async (req, res) => {
  try {
    const id = req.params._id;
    const index = parseInt(req.params.index, 10);

    // Find existing doctor data
    const existingDoctor = await adddoctormodal.findById(id);

    if (!existingDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (
      isNaN(index) ||
      index < 0 ||
      index >= existingDoctor.upcoming_events.length
    ) {
      return res.status(400).json({ message: "Invalid index" });
    }

    // Remove the image at that index
    const deletedImage = existingDoctor.upcoming_events[index];
    existingDoctor.upcoming_events.splice(index, 1);

    // Save updated document
    await existingDoctor.save();

    res.status(200).json({
      message: "Image deleted successfully",
      deletedImage,
      updatedDoctor: existingDoctor,
    });
  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// work experience and awards/achievements functions
const add_work_experience = async (req, res) => {
  try {
    const id = req.params._id;
    const {doctor_id,hospital_name,from_year,to_year,designation,major_achievements} = req.body;

    const doctor = await adddoctormodal.findById(id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

      const new_workexperience=[]
    // Push new work experience into array
    new_workexperience.push({
      doctor_id,hospital_name,from_year,to_year,designation,major_achievements
    });

    const updateworkexperience=[...doctor.work_experience,...new_workexperience]

  const resp = await adddoctormodal.findByIdAndUpdate(
  id,
  { $set: { work_experience: updateworkexperience } },
  { new: true, upsert: true }
);

    res
      .status(200)
      .json({ message: "Work experience added successfully", doctor });
  } catch (error) {
    console.error("Error adding work experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const edit_work_experience = async (req, res) => {
  try {
  
    
    const doctorId = req.params._id; 
     const index = parseInt(req.params.index, 10); 
    const { hospital_name,from_year,to_year,designation,major_achievements } =  req.body;
    

    const doctor = await adddoctormodal.findById({_id:doctorId});
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check index validity
    if (index < 0 || index >= doctor.work_experience.length) {
      return res.status(400).json({ message: "Invalid work experience index" });
    }

    // Update fields
    doctor.work_experience[index].hospital_name = hospital_name;
    doctor.work_experience[index].from_year = from_year;
    doctor.work_experience[index].to_year = to_year;
    doctor.work_experience[index].designation = designation;
    doctor.work_experience[index].major_achievements = major_achievements;

    await doctor.save();

    res.status(200).json({
      message: "Work experience updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error editing work experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





//======================= add awards_and_achievements================================

const add_awards_achievements = async (req, res) => {
  try {
    const id = req.params._id;
    const { title, year, organization, description, link_of_award } = req.body;

    const doctor = await adddoctormodal.findById(id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Upload award photo if file is provided
    let photoUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photoUrl = result.secure_url;    
    }

    // Create award object
    const newAward = {
      title,
      year,
      organization,
      description,
      link_of_award,
      photo_of_award: photoUrl,
    };

    doctor.awards_and_achievements.push(newAward);
    await doctor.save();

    res
      .status(201)
      .json({
        message: "Award/Achievement added successfully",
        award: newAward,
      });
  } catch (error) {
    console.error("Error adding award:", error);
    res.status(500).json({ message: "Internal server error" });
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


  module.exports={add_doctor,logindoctor,changePassword,viewdoctor,updatedoctor,viewdoctorby_id,
    addimagegallary,deleteimagefromgallary,addupcomingevents,deleteupcomingevents,add_work_experience,
    add_awards_achievements,edit_work_experience
  }