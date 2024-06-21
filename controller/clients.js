
const Clients = require("../models/clients");
const cloudinary = require("../utils/cloudinary");

module.exports={
    Addclients: async(req,res)=>{
        try {
            console.log(req.body,"req.body");
            const {heading} = req.body
           
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result,"result");
            const image = result.url
            await Clients.create({heading,image})
            console.log('clients Added successfully');
            res.redirect('/admin/clients');  
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    Getclients: async(req,res)=>{
        try {
            const Data = await Clients.find().sort({_id:-1})
            res.render('admin/clients',{layout:"adminlayout",Data})
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    Editclients: async(req,res)=>{
        try {
            const id = req.params.id;
            const { heading } = req.body;
            const data = await Clients.findById(id);
    
            if (!data) {
                return res.status(404).json({ message: 'clients not found' });
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
            await Clients.findByIdAndUpdate(id, {
                heading,
                image
            });
    
            console.log("Updated successfully");
            res.redirect('/admin/clients');
        }  catch (error) {
            console.log(error);
            res.render("error")
        }
    },
    Deleteclients:async(req,res)=>{
        try {
            console.log("llllll");
            const id = req.params.id
            await Clients.findByIdAndDelete(id)
            console.log("Deleted Successfully");
            res.redirect('/admin/clients')
        } catch (error) {
            res.render('error')
            console.log(error);
        }
    }
}