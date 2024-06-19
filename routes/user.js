var express = require('express');
const usercontroller = require('../controller/usercontroller');
const contact = require('../controller/contact');
var router = express.Router();

/* GET home page. */
router.get('/', usercontroller.RenderHomePage);
router.get('/about',usercontroller.RenderAboutPage);
router.get('/service',usercontroller.RenderServicePage);
router.get('/works',usercontroller.RenderWorksPAge);
router.get('/contact',usercontroller.RenderContactPage);

router.post('/contact-form',contact.AddContact);

router.get('/:id',usercontroller.RenderWorksDetailPage);
router.get('/service/:id',usercontroller.RenderServiceDetailPage);


// router.get('*', function(req, res) {
//     res.render('error');
//   });
  
module.exports = router;
