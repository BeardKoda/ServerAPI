// import { Cfx, } from '../../helpers/conflux';
const models = require('../models');

let cronjob = {
	getWalletBalance:async(env)=>{
		// console.log(env, '\n\n\n');
		// let cfx = Cfx(env);
		let trans = await models.Transaction.find({}).select('address').lean();
		// console.log(wallets.length);
		// if(wallets.length>0){
		// 	for(var i=0; i<wallets.length; i++){
		// 		let wallet = wallets[i];
		// 		let mainbalance = await getBalance(wallet.address, env);
		// 		// console.log(wallet, mainbalance, env, '\n\n\n');
		// 		let frozen_test = 0.000, total_test = mainbalance, balance_test=mainbalance-frozen;
		// 		let frozen = 0.000, total = mainbalance, balance=mainbalance-frozen;
		// 		let data = env ? { frozen, total, balance }:{ frozen_test, total_test, balance_test };
		// 		// console.log('data===',data, '\n\n');
		// 		await models.Wallet.findOneAndUpdate({_id:wallet._id}, data);
		// 	}
		// }
		return true;
	},
};

module.exports = cronjob;
