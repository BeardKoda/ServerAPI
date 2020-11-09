/* eslint-disable no-undef */
const mongoose = require('mongoose');
const mongoUrl = process.env.DB_URL || 'mongodb://localhost:27017/recieverApp';
// const seeds = require('../app/seeds');

const load = async() =>{
	try{
		await mongoose.connect(mongoUrl, {
			useNewUrlParser: true,
			useCreateIndex: true, 
			useUnifiedTopology:true,
			useFindAndModify:false
		}).then(()=>{
			console.log('Server Database Connected');
		});
	}
	catch(err){
		return Promise.reject(err);
	}
};
module.exports.load = load;