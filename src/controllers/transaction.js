let limit = 50;   // number of records per page
let offset = 0;
const { validationResult } = require('express-validator');
const axios = require('axios');
const configD = require('../config');
console.log(configD);


/* GET actorController. */
let controller = {
  recieve: async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()[0]);
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    console.log('returning ==>', req.body);
    return res.status(200).json({
      success: true,
      message: "successfull made transaction",
      data: { txid: "sfasfasfasfsaf" },
    });
  },

  create: async (req, res) => {
    try {
      // console.log(req.body, '\n\n\n');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array()[0]);
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
      console.log(token, body, url);
      let ressd = await axios.post(`${url}`, body, config);
      // .then((res) => {
      console.log(ressd.data, '\n');
      let rvt = ressd.data;
      return res.status(200).json(rvt);
      // })
    } catch (err) {
      let data = err.response;
      console.log('\n\n\n', data.data);
      return res.status(data.status).json({message: data.data.error});
    }
  },

  proceed: async (req, res) => {
      let txId = req.params.txId;
      let secretKey = req.query.secretKey;
      console.log(txId, secretKey, req.query, '\n\n\n');
    try {
      let url = `${process.env.UAPI}/transaction/process?txId=${txId}`;
      let token = `${secretKey||process.env.secret_key}`;
      let config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      let body = req.body;
      // console.log(token, body, url);
      let ressd = await axios.post(`${url}`, null, config);
      // .then((res) => {
      console.log(ressd.data);
      let rvt = ressd.data;
      return res.status(200).json(rvt);
      // })
    } catch (err) {
      let data = err.response;
      console.log(err.response, err.response.data);
      return res.status(data.status).json({ message: data.data.message });
    }
  },
};

module.exports = controller;