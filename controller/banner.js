const Banner = require("../models/banner");
const cloudinary = require("../utils/cloudinary");

module.exports={
    AddBanner: async(req,res)=>{
        try {
            console.log(req.body,"req.body");
            const {heading,subheading} = req.body
           
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result,"result");
            const image = result.url
            await Banner.create({heading,subheading,image})
            console.log('Banner Added successfully');
            res.redirect('/admin/banner');  
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    GetBanner: async(req,res)=>{
        try {
            const Data = await Banner.find().sort({_id:-1})
            res.render('admin/banner',{layout:"adminlayout",Data})
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    EditBanner: async(req,res)=>{
        try {
            const id = req.params.id;
            const { heading, subheading } = req.body;
            const data = await Banner.findById(id);
    
            if (!data) {
                return res.status(404).json({ message: 'Banner not found' });
            }
    
            let image = data.image;
    
            if (req.file) {
                // Extract the public ID of the existing image from its URL
                const publicId = image.split('/').pop().split('.')[0];
    
                // Destroy the old image from Cloudinary
                const destroyResult = await cloudinary.uploader.destroy(publicId);
                console.log(destroyResult, "Image deletion result");
    
                // Upload the new image to Cloudinary
                const uploadResult = await cloudinary.uploader.upload(req.file.path);
                image = uploadResult.url; // Update image URL with the new one
                console.log(uploadResult, "Image upload result");
            }
    
            // Update the banner with new details
            await Banner.findByIdAndUpdate(id, {
                heading,
                subheading,
                image
            });
    
            console.log("Updated successfully");
            res.redirect('/admin/banner');
        }  catch (error) {
            console.log(error);
            res.render("error")
        }
    },
    DeleteBanner:async(req,res)=>{
        try {
            console.log("llllll");
            const id = req.params.id
            await Banner.findByIdAndDelete(id)
            console.log("Deleted Successfully");
            res.redirect('/admin/banner')
        } catch (error) {
            res.render('error')
            console.log(error);
        }
    }
}