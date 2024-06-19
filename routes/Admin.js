const express = require('express');
const admincontroller = require('../controller/admincontroller');
const upload = require('../utils/multer');
const banner = require('../controller/banner');
const service = require('../controller/service');
const Work = require('../controller/Work');
const clients = require('../controller/clients');
const router = express.Router();

/* GET users listing. */
router.get('/',admincontroller.AdminDashboard);

//Banner 
router.get('/banner',banner.GetBanner);
router.post('/add-banner',upload.single('image'),banner.AddBanner);
router.post('/edit-banner/:id',upload.single('image'),banner.EditBanner);
router.get('/delete-banner/:id',banner.DeleteBanner);

//Service
router.get('/service',service.AdminServicePage);
router.post('/add-service',upload.single('image'),service.AddService);
router.post('/edit-service/:id',upload.single('image'),service.EditService);
router.get('/delete-service/:id',service.DeleteService);

//Works
router.get('/work',Work.AdminWorkPage);
router.post('/add-work',upload.single('image'),Work.AddWorks);
router.post('/edit-work/:id',upload.single('image'),Work.EditWorks);
router.get('/delete-work/:id',Work.DeleteWorks);

//Clients
router.get('/clients',clients.Getclients);
router.post('/add-clients',upload.single('image'),clients.Addclients);
router.post('/edit-clients/:id',upload.single('image'),clients.Editclients);
router.get('/delete-clients/:id',clients.Deleteclients);



module.exports = router;
