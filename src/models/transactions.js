'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;

const modelSchema = new Schema(
	{
		txId: {
			type: String,
			default: function genUUID() {
				return 'IDIDI_' + uuid.v1();
			},
		},
		uniTxId: {
			type: String,
		},
		APIkey: {
			type: String,
			required: 'API Key is required'
		},
		// recievingPartner: {
		// 	type: Schema.Types.ObjectId,
		// 	required: 'Reciever Id is required',
		// 	ref: 'Partner',
		// },
		sender: {
			name: {
				type: String,
			},
			email: {
				type: String,
			},
			phone: {
				type: String,
			},
			address: {
				type: String,
			},
			country: {
				type: String,
			},
		},
		reciever: {
			name: {
				type: String,
			},
			email: {
				type: String,
			},
			phone: {
				type: String,
			},
			address: {
				type: String,
			},
			country: {
				type: String,
			},
		},
		amount: {
			type: 'String',
			required: 'amount is required',
			default: 0.0,
		},
		txFee: {
			type: 'String',
			required: 'transfer fee',
			default: 0.0,
		},
		rate: {
			type: 'String',
			required: 'Rate Fee',
			default: 0.0,
		},
		paymentMethod: {
			type: String,
			enum: ['bank', 'mobile-money'],
			required: 'Payment method not specified',
		},
		paymentDetails: {
			Bank: {
				type: String,
			},
			AccountNumber: {
				type: String,
			},
			AccountName: {
				type: String,
			},
		},
		orderId: {
			type: String
		},
		txHash: {
			type: String
		},
		explorerUrl: {
			type: String
		},
		status: {
			type: String,
			enum: [
				'initiated',
				'awaiting',
				'pending',
				'processing',
				'sent',
				'completed',
				'failed',
			],
			default: "initiated",
		},
		r_Status: {
			type: String,
			enum: [
				'initiated',
				'awaiting',
				'pending',
				'processing',
				'sent',
				'completed',
				'failed',
			],
			default: "initiated",
		},
		prod: {
			type: Boolean,
			default: false,
		},
		sendingCurrency: {
			type: String,
			required: 'sending Currency',
		},
		recievingCurrency: {
			type: String,
			// required: 'Recieving Currency',
		},
		dated:{
			type: Date
		}
	},
	{
		timestamps: true,
	}
);


modelSchema.plugin(uniqueValidator);

const model = mongoose.model('Transaction', modelSchema);

module.exports = model;