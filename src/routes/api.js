const transactioon = require('../controllers/transaction');
const requestVal = require('../requests/transaction')
const authValidate = require('../authValid');
// const authGuard = require('../middlewares/apiAuth');

var route = require('express').Router();
route.post("/sendPayment", requestVal.validate('create'), transactioon.create);
route.post("/sendPayment/proceed/:txId", requestVal.validate("create"), transactioon.proceed);
route.post('/universal/transaction/recieve', authValidate, requestVal.validate('recieve'), transactioon.recieve);
route.get("/getTransactions/:id", transactioon.fetchAll);

route.all('**', (req, res, next)=>{
    return res.status(404).json({error:'route not found'});
});

module.exports = route;