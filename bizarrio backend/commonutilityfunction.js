const cloudinary=require('cloudinary').v2

require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

// common function to upload single/multiple images
 const uploadToCloudinary = async (files) => {
  try {
    if (!files || files.length === 0) return [];

    const uploadPromises = files.map(file =>
      cloudinary.uploader.upload(file.path, {
        folder: "uploads", // optional: store in a folder
        resource_type: "auto"
      })
    );

    const results = await Promise.all(uploadPromises);
    return results.map(res => res.secure_url); // return only urls
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

module.exports=uploadToCloudinary