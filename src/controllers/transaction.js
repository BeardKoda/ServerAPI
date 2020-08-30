let limit = 50;   // number of records per page
let offset = 0;
const { validationResult } = require('express-validator');
const axios = require('axios');


/* GET actorController. */
let controller = {
  recieve: async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()[0]);
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    return res.status(200).json({
      success: true,
      message: "successfull made transaction",
      data: { txid: "sfasfasfasfsaf" },
    });
  },
  create: async (req, res) => {
    try {
      // console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array()[0]);
        return res.status(400).json({ errors: errors.array()[0].msg });
      }
      let url = `${process.env.UAPI}/transaction/initiate`;
      let token = `${process.env.secret_key}`;
      let config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      let body = req.body;
      // console.log(token, body, url);
      let ressd = await axios.post(`${url}`, body, config);
      // .then((res) => {
      console.log(ressd.data);
      let rvt = ressd.data;
      return res.status(200).json(rvt);
      // })
    } catch (err) {
      console.log(err);
      let data = err.response.data;
      return res.status(data.status).json({ message: data.error });
    }
  },
  proceed: async (req, res) => {
      let txId = req.params.txId;
      console.log(txId);
    try {
      let url = `${process.env.UAPI}/transaction/process?txId=${txId}`;
      let token = `${process.env.secret_key}`;
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
      console.log(err);
      let data = err.response.data;
      return res.status(data.status).json({ message: data.error });
    }
  },
};

module.exports = controller;