import axios from 'axios';

const service = {
  postPayment(data) {
    // console.log(data);
    return axios.post(`/api/v1/sendPayment`, data);
  },
  proceedPayment(txId, key) {
    // console.log(data);
    return axios.post(`/api/v1/sendPayment/proceed/${txId}?secretKey=${key}`);
  },
};
export default service;
