const express = require('express');
const admincontroller = require('../controller/admincontroller');
const upload = require('../utils/multer');
const banner = require('../controller/banner');
const service = require('../controller/service');
const Work = require('../controller/work');
const clients = require('../controller/clients');
const adminauth = require('../middlewear/adminauth');
const router = express.Router();

/* GET users listing. */
router.get('/adgroup',adminauth.adminauth, admincontroller.AdminDashboard);
router.post('/login', admincontroller.PostLogin);
router.get('/login', admincontroller.GetLogin);

router.get('/logout',adminauth.adminauth, admincontroller.AdminLogout)

//Banner 
router.get('/banner',adminauth.adminauth, banner.GetBanner);
router.post('/add-banner',adminauth.adminauth, upload.single('image'),adminauth.adminauth, banner.AddBanner);
router.post('/edit-banner/:id',adminauth.adminauth, upload.single('image'),adminauth.adminauth, banner.EditBanner);
router.get('/delete-banner/:id',adminauth.adminauth, banner.DeleteBanner);

//Service
router.get('/service',adminauth.adminauth, service.AdminServicePage);
router.post('/add-service',adminauth.adminauth, upload.single('image'),adminauth.adminauth, service.AddService);
router.post('/edit-service/:id',adminauth.adminauth, upload.single('image'),adminauth.adminauth, service.EditService);
router.get('/delete-service/:id',adminauth.adminauth, service.DeleteService);

//Works
router.get('/work',adminauth.adminauth, Work.AdminWorkPage);
router.post('/add-work',adminauth.adminauth, upload.single('image'),adminauth.adminauth, Work.AddWorks);
router.post('/edit-work/:id',adminauth.adminauth, upload.single('image'),adminauth.adminauth, Work.EditWorks);
router.get('/delete-work/:id',adminauth.adminauth, Work.DeleteWorks);

//Clients
router.get('/clients',adminauth.adminauth, clients.Getclients);
router.post('/add-clients',adminauth.adminauth, upload.single('image'),adminauth.adminauth, clients.Addclients);
router.post('/edit-clients/:id',adminauth.adminauth, upload.single('image'),adminauth.adminauth, clients.Editclients);
router.get('/delete-clients/:id',adminauth.adminauth, clients.Deleteclients);



module.exports = router;
