let limit = 50;   // number of records per page
let offset = 0;
const { validationResult } = require('express-validator');
const axios = require('axios');
const configD = require('../config');
const models = require('../models');
console.log(configD);


/* GET actorController. */
let controller = {
  recieve: async (req, res) => {
    // console.log('\n\n recieving====>');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()[0]);
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    try{
      // console.log('\n\n Processing ==>');
      let token = 'recieved';
      let body = req.body;
      body.status = 'completed';
      body.r_status = 'completed';
      let saveTrans = await controller.saveTransact(body, body.currency, token );
      // console.log(saveTrans);
      // console.log('\n\n Completed ==>');
      return res.status(200).json({
        success: true,
        message: "successfull made transaction",
        data: { txid: "sfasfasfasfsaf" },
      });
    } catch (err) {
      let data = err.response || err;
      console.log('\n\n\n', err.response, 'key==>');
      errCode = data.status || 500 ;
      errMsg = data.data ? data.data.message : "An error Occurred Contact Support.";
      return res.status(errCode).json({message: errMsg});
    }
  },

  create: async (req, res) => {
    try {
      console.log(req.body, '\n\n\n');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // console.log(errors.array()[0]);
        return res.status(400).json({ errors: errors.array()[0].msg });
      }
      let url = `${configD.API}/transaction/initiate`;
      let token = `${req.body.secretKey || configD.secret_key}`;
      let config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      let body = req.body;
      // console.log(token, body, url);
      // let saveTrans = await controller.saveTransact(body, body.currency, token );
      // console.log('transa===>', saveTrans);
      let ressd = await axios.post(`${url}`, body, config);
      console.log(ressd.data, '\n');
      let rvt = ressd.data;
      // let updateTrans = await controller.updateTransact(saveTrans.txId, {sendingCurrency: rvt.sendingCurrency, recievingCurrency:rvt.recievingCurrency, rate: rvt.rate, uniTxId: rvt.txId, dated: rvt.transDate, sender: rvt.sender, reciever: rvt.reciever} );
      console.log(updateTrans);
      return res.status(200).json(rvt);
    } catch (err) {
      let data = err.response || err;
      console.log('\n\n\n', err.response.status, 'key==>');
      errCode = data.status || 500 ;
      errMsg = data.data ? data.data.message : "An error Occurred Contact Support.";
      return res.status(errCode).json({message: errMsg});
    }
  },

  proceed: async (req, res) => {
      let txId = req.params.txId;
      let secretKey = req.query.secretKey;
      console.log(txId, secretKey, req.query, '\n\n\n');
    try {
      await controller.updateByUnTxId(txId, {status:'processing'});
      let url = `${configD.API}/transaction/process?txId=${txId}`;
      let token = `${secretKey||process.env.secret_key}`;
      let config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
        timeout:20000
      };
      let body = req.body;
      console.log(token, body, url);
      let ressd = await axios.post(`${url}`, null, config);
      // .then((res) => {
      console.log(ressd.data);
      let rvt = ressd.data;
      return res.status(200).json(rvt);
      // })
    } catch (err) {
      let data = err.response || err;
      console.log('\n\n\n', data, 'key==>'); errCode = data.status || 500 ;
      errMsg = data.data ? data.data.error : "An error Occurred Contact Support.";
      return res.status(errCode).json({message: errMsg});
    }
  },

	saveTransact: async (order, currency, APIkey=null, rate=0, prod=false) => {
		// console.log(rate);
		let body = {
      APIkey,
			sender: {
				name: order.senderName,
				email: order.senderEmail,
				phone: order.senderPhone,
				address: order.senderAddress
			},
			reciever: {
				name: order.recieverName,
				email: order.recieverEmail,
				phone: order.recieverPhone,
				address: order.recieverAddress,
				country: order.recieverCountry
			},
			status: 'awaiting',
			amount: order.amount,
			rate,
			sendingCurrency: currency,
			paymentMethod: order.paymentMethod,
			paymentDetails:
        order.paymentMethod == 'bank' ? { bank: order.bankName, accountName: order.accountName, accountNumber: order.accountNumber } : null,
			prod: prod,
		};
		console.log(body, '\n\n\n\n');
		let tran = new models.Transaction(body);
		let newTrans = await tran.save();
		let data = {
			txId: newTrans.txId,
			amount: newTrans.amount,
			sender: {
				name: newTrans.sender.name,
				email: newTrans.sender.email,
				phone: newTrans.sender.phone,
				address: newTrans.sender.address,
				country: newTrans.sender.country,
			},
			reciever: {
				name: newTrans.reciever.name,
				email: newTrans.reciever.email,
				phone: newTrans.reciever.phone,
				address: newTrans.reciever.address,
				country: newTrans.reciever.country,
				currency: newTrans.reciever.currency,
			},
			sendingCurrency: newTrans.sendingCurrency,
			recievingCurrency: newTrans.recievingCurrency,
			// rate:rate,
			paymentMethod: newTrans.paymentMethod,
			paymentDetails: newTrans.paymentDetails,
			transDate: newTrans.createdAt,
		};
		return data;
  },
  
	updateTransact: async (txId, data) => {
		console.log(data, '\n\n\n\n', txId);
		let trans = await models.Transaction.findOneAndUpdate(
			{ txId },
			data
		).select('-updatedAt').lean();
			console.log(trans);
		if (!trans) {
			return { error: 'Invalid transaction Id' };
		}
		return true;
  },

  updateByUnTxId:  async (uniTxId, data) => {
		console.log(data, '\n\n\n\n', uniTxId);
		let trans = await models.Transaction.findOneAndUpdate(
			{ uniTxId },
			data
		).select('-updatedAt').lean();
			console.log(trans);
		if (!trans) {
			return { error: 'Invalid transaction Id' };
		}
		return true;
  },
  
  fetchAll: async (req, res) => {
    let apikey = req.params.id;
    let search = req.query.search || null;
    let where = search? {$or:[{ txId: search}, {uniTxId: search}], APIkey: apikey}:{APIkey: apikey};
    try{
      let trans = await models.Transaction.find({}).where(where).limit(20);
      return res.status(200).json({data:trans});
    }catch(err){
      let data = err.response || err;
      console.log('\n\n\n', err, 'key==>');
      errCode = data.status || 500 ;
      errMsg = data.data ? data.data.error : "An error Occurred Contact Support.";
      return res.status(errCode).json({message: errMsg});
    }
  },

  updateTx : async(req, res) => {
    let unitxId = req.params.id;
    console.log(unitxId);
    let data = req.body.data;
    try{
      let trans = await models.Transaction.findOneAndUpdate(
        { unitxId },
        data
      ).select('-updatedAt').lean();
      return res.status(200).json({data:trans});
    }catch(err){
      let data = err.response || err;
      console.log('\n\n\n', err, 'key==>');
      errCode = data.status || 500 ;
      errMsg = data.data ? data.data.error : "An error Occurred Contact Support.";
      return res.status(errCode).json({message: errMsg});
    }
  }


};

module.exports = controller;