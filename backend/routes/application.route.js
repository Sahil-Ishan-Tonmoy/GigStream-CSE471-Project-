const express = require('express');
const router = express.Router();
const upload = require('../config/upload.config'); // Update the path to the correct location
const {check,get_position, get_application_Details, create_application, update_status } = require('../controllers/application.controller');

router.post('/', upload.single('cvAttachment'), create_application);
router.get('/:applicationId', get_application_Details);
router.get('/position/:id/:title/:aid', get_position);
router.get('/check/:id/:title/:position', check);
router.patch('/status/:role/:id/:aid', (req, res, next) => {
    console.log('PATCH /status hit', req.body);
    next();
}, update_status);
// router.patch('/status`', update_status);

module.exports = router;
