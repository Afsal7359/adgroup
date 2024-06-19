module.exports={
    AdminDashboard : async(req,res)=>{
        try {
            console.log("herreeee");
            res.render('admin/dashboard',{layout:'adminlayout'})
        } catch (error) {
            console.log(error);
            res.render('error')
        }
    },
  
}