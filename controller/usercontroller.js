const Works = require("../models/Work");
const Banner = require("../models/banner");
const Clients = require("../models/clients");
const Service = require("../models/service");

module.exports={
    RenderHomePage : async(req,res)=>{
        try {
            const banner = await Banner.find().sort({_id:-1})
            const service = await Service.find().sort({_id:-1})
            const clients= await Clients.find().sort({_id:-1})
            // const work = await Works.find().sort({_id:-1}).limit(3)
            res.render('user/home',{banner,service,clients,work})
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    RenderAboutPage : async (req,res)=>{
        try {
            const clients= await Clients.find().sort({_id:-1})
            res.render('user/about',{clients})
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    RenderServicePage: async(req,res)=>{
        try {
            const clients= await Clients.find().sort({_id:-1})
            const service = await Service.find().sort({_id:-1})
            res.render("user/service",{clients,service})
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    RenderWorksPAge: async(req,res)=>{
        try {
            const clients= await Clients.find().sort({_id:-1})
            const work = await Works.find().sort({_id:-1})
            res.render('user/works',{work,clients})
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    RenderContactPage: async(req,res)=>{
        try {
            const clients= await Clients.find().sort({_id:-1})
            res.render("user/contact",{clients})
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
    RenderWorksDetailPage: async(req,res)=>{
        try {
            const workId = req.params.id;
            const work = await Works.findById(workId)
            console.log(work);
            res.render('user/worksdetail',{work})
        } catch (error) {
            res.render("error")
            console.log(error);
        }
    },
    RenderServiceDetailPage: async(req,res)=>{
        try {
            const serviceId = req.params.id;
            const service = await Service.findById(serviceId)
            res.render('user/servicedetail',{service})
        } catch (error) {
            res.render("error")
            console.log(error);
        }
    }
}