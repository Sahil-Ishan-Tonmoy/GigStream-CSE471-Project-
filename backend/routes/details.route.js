const express = require('express');
const { get_EmployeeDetails, get_GigDetails } = require('../controllers/search.controller');
const router = express.Router();



router.get('/employee/:employeeId', get_EmployeeDetails);
router.get('/gig/:title', get_GigDetails);

module.exports = router;
