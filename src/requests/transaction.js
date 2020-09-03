const { check } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
      case "recieve": {
        return [
          check("paymentMethod", "Payment method is Required").exists(),
          check("amount", "Amount is Required").exists(),
          check("currency", "Currency is Required").exists(),
          check("reciever", "Reciever Country is Required").exists(),
          check("sender", "Sender is Required").exists(),
          // check("senderName", "Sender's Name is required").exists(),
          // check("senderEmail", "Sender's Email is required").exists(),
          // check("senderPhone", "Sender's Phone Detail is required").exists(),
          // check("senderAddress", "Sender's Address is required").exists(),
          // check("recieverName", "reciever's Name is required").exists(),
          // check("recieverEmail", "reciever's Email is required").exists(),
          // check(
          //   "recieverPhone",
          //   "reciever's Phone Detail is required"
          // ).exists(),
          // check("recieverAddress", "reciever's Address is required").exists(),
        ];
      }
      case "create": {
        return [
          check("paymentMethod", "Payment method is Required").exists(),
          check("amount", "Amount is Required").exists(),
          check("currency", "Currency is Required").exists(),
          check("recieverCountry", "Country is Required").exists(),
          check("senderName", "Sender's Name is required").exists(),
          check("senderEmail", "Sender's Email is required").exists(),
          check("senderPhone", "Sender's Phone Detail is required").exists(),
          check("senderAddress", "Sender's Address is required").exists(),
          check("recieverName", "reciever's Name is required").exists(),
          check("recieverEmail", "reciever's Email is required").exists(),
          check(
            "recieverPhone",
            "reciever's Phone Detail is required"
          ).exists(),
          check("recieverAddress", "reciever's Address is required").exists(),
        ];
      }
    }
  }