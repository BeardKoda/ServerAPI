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
  getTransactions(id, search=null){
    let searchFilter = search? `search=${search}`:'';
    return axios.get(`/api/v1/getTransactions/${id}?${searchFilter}`)
  }
};
export default service;
