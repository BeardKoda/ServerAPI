// routes.js
const express = require("express");
const router = express.Router();
const { check, validationResult, matchedData } = require("express-validator");
const transaction = require('../controllers/transaction');

router.post("/sendPayments", (req, res)=>{
	console.log(req.body, '\n\n\n');
	res.status(200).json({data: req.body});
});
router.post("/sendPayment", transaction.create);

module.exports = router;
