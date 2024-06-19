const cloudinary = require("../utils/cloudinary");
const Service = require('../models/service');


module.exports={
    
    AdminServicePage:async(req,res)=>{
        try {
            const Data = await Service.find().sort({_id:-1})
            res.render('admin/service',{layout:"adminlayout",Data});
        } catch (error) {
            res.render('error')
        }
    },
    AddService: async(req,res)=>{
        try {
            console.log(req.body,"req.body");
            const {heading,description} = req.body
           
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result,"result");
            const image = result.url
            await Service.create({heading,description,image})
            console.log('Service Added successfully');
            res.redirect('/admin/service');  
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    
    EditService: async(req,res)=>{
        try {
            const id = req.params.id;
            const { heading, description } = req.body;
            const data = await Service.findById(id);
    
            if (!data) {
                return res.status(404).json({ message: 'Service not found' });
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
            await Service.findByIdAndUpdate(id, {
                heading,
                description,
                image
            });
    
            console.log("Updated successfully");
            res.redirect('/admin/service');
        }  catch (error) {
            console.log(error);
            res.render("error")
        }
    },
    DeleteService:async(req,res)=>{
        try {
            console.log("llllll");
            const id = req.params.id
            await Service.findByIdAndDelete(id)
            console.log("Deleted Successfully");
            res.redirect('/admin/service')
        } catch (error) {
            res.render('error')
            console.log(error);
        }
    }
}