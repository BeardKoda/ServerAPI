import React from 'react';
import './form.css';
import FormHeader from './formHeader';
import { useFormik } from "formik";
import * as Yup from "yup";
import countries from "../assets/countries.json";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import formService from "./form.service";
import ModalView from './view';
import { useState } from 'react';

const Form = () =>{
	return(
		<div className="row justify-content-center align-content-center mt-5">
			<div className="col-md-6">
				<FormHeader />
				<FormBody />
			</div>
		</div>
	)
}

const FormBody = () =>{
  const [show, setShow] =useState(false);
  const [data, setData] =useState({ a: 1, b: 2 });
  
  const formData = {
    secretKey: "",
    amount: "",
    currency: "",
    senderName: "",
    senderEmail: "",
    senderAddress: "",
    senderPhone: "",
    recieverName: "",
    recieverPhone: "",
    recieverEmail: "",
    recieverAddress: "",
    recieverCountry: "",
    paymentMethod: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
  };
  const formSchema = Yup.object().shape({
    secretKey: Yup.string().required("API Key is Required"),
    amount: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    senderName: Yup.string().required("Required"),
    senderEmail: Yup.string().required("Required"),
    senderAddress: Yup.string().required("Required"),
    recieverName: Yup.string().required("Required"),
    recieverEmail: Yup.string().required("Required"),
    recieverAddress: Yup.string().required("Required"),
    recieverCountry: Yup.string().required("Required"),
    paymentMethod: Yup.string().required("Required"),
    // bankName: Yup.string(),
    // accountName: Yup.string(),
    // accountNumber: Yup.string(),
  });
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting, resetForm } = useFormik({
    initialValues: formData, validationSchema: formSchema, onSubmit(values) {
      return makeTransaction(values);
    },
  });

  const makeTransaction=(values)=>{
    formService.postPayment(values)
    .then((res)=>{
      console.log(res.data);
      setData(res.data)
      setShow(true)
    })
    .catch((err)=>{
      let msg = err.response;
      console.log(msg.data.message);
      AlertResp({title:'Error Occurred', text:msg.data.message, icon:'error', confirmButtonText:'Try Again'});
      setSubmitting(false);
    });
  }

  const ProceedPayment=(txId)=>{
    setSubmitting(true);
    // console.log("here");
    setShow(false);
    formService.proceedPayment(txId, values.secretKey).then((res) => {
      setSubmitting(false);
        resetForm(formData);
      AlertResp({title:'Success', text:res.message, icon:'success', confirmButtonText:'close'});
    })
      .catch((err) => {
        let msg = err.response.data.message;
        resetForm(formData);
        setSubmitting(false);
        // console.log(msg);
        AlertResp({
          title: "Error Occurred",
          text: msg,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  }
	// console.log(errors, touched); 
	return (
    <form className={"form"} onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12 form-field">
          <FormInput
            label={"API SECRET KEY"}
            name={"secretKey"}
            type={"text"}
            value={values.secretKey}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          {errors.secretKey && touched.secretKey ? (
            <h6 className="error">{errors.secretKey}</h6>
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-field">
          <FormInput
            label={"Amount to Send"}
            name={"amount"}
            type={"text"}
            value={values.amount}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          {errors.amount && touched.amount ? (
            <h6 className="error">{errors.amount}</h6>
          ) : null}
        </div>
        <div className="col-md-6 form-field">
          <label htmlFor="currency">Select Currency</label>
          <select
            id="currency"
            name="currency"
            className={"form-control input"}
            defaultValue={values.currency}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option></option>
            <option>USDT</option>
          </select>
          {errors.currency && touched.currency ? (
            <h6 className="error">{errors.currency}</h6>
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-6 form-field">
          <FormInput
            label={"name"}
            name={"senderName"}
            type={"text"}
            value={values.senderName}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          {errors.senderName && touched.senderName ? (
            <h6 className="error">{errors.senderName}</h6>
          ) : null}
        </div>
        <div className="col-6 form-field">
          <FormInput
            label={"Phone"}
            name={"senderPhone"}
            type={"text"}
            value={values.senderPhone}
            handleChange={handleChange}
          />
          {errors.senderPhone ? (
            <h6 className="error">{errors.senderPhone}</h6>
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-6 form-field">
          <FormInput
            label={"email"}
            name={"senderEmail"}
            type={"email"}
            value={values.senderEmail}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          {errors.senderEmail && touched.senderEmail ? (
            <h6 className="error">{errors.senderEmail}</h6>
          ) : null}
        </div>
        <div className="col-6 form-field">
          <FormInput
            label={"Address"}
            name={"senderAddress"}
            type={"text"}
            value={values.senderAddress}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          {errors.senderAddress && touched.senderAddress ? (
            <h6 className="error">{errors.senderAddress}</h6>
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-6 form-field">
          <FormInput
            label={"Reciever's Full Name"}
            name={"recieverName"}
            type={"text"}
            value={values.recieverName}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          {errors.recieverName && touched.recieverName ? (
            <h6 className="error">{errors.recieverName}</h6>
          ) : null}
        </div>
        <div className="col-6 form-field">
          <FormInput
            label={"Reciever's Phone Number"}
            name={"recieverPhone"}
            type={"text"}
            value={values.recieverPhone}
            handleChange={handleChange}
          />
          {errors.recieverPhone && touched.recieverPhone ? (
            <h6 className="error">{errors.recieverPhone}</h6>
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-6 form-field">
          <FormInput
            label={"Reciever's Email"}
            name={"recieverEmail"}
            type={"email"}
            value={values.recieverEmail}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          {errors.recieverEmail && touched.recieverEmail ? (
            <h6 className="error">{errors.recieverEmail}</h6>
          ) : null}
        </div>
        <div className="col-6 form-field">
          <FormInput
            label={"Reciever's Address"}
            name={"recieverAddress"}
            type={"text"}
            value={values.recieverAddress}
            handleChange={handleChange}
          />
          {errors.recieverAddress && touched.recieverAddress ? (
            <h6 className="error">{errors.recieverAddress}</h6>
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-6 form-field">
          <label htmlFor="country">Reciever's Country</label>
          <select
            id="country"
            name="recieverCountry"
            onChange={handleChange}
            onBlur={handleBlur}
            className={"form-control input"}
          >
            {countries.map((count, i) => (
              <option key={i} value={count.name}>
                {count.name}
              </option>
            ))}
          </select>
          {errors.recieverCountry && touched.recieverCountry ? (
            <h6 className="error">{errors.recieverCountry}</h6>
          ) : null}
        </div>
        <div className="col-6 form-field">
          <label htmlFor="pay">Payment Method</label>
          <select
            id="pay"
            name="paymentMethod"
            onChange={handleChange}
            onBlur={handleBlur}
            className={"form-control input"}
            defaultValue={values.paymentMethod}
          >
            <option value={""} disabled></option>
            <option value={"mobile-money"}>Mobile-Money</option>
            <option value={"bank"}>Bank</option>
          </select>
          {errors.paymentMethod && touched.paymentMethod ? (
            <h6 className="error">{errors.paymentMethod}</h6>
          ) : null}
        </div>
      </div>
      {values.paymentMethod === "bank" && (
        <div className="row">
          <div className="col-12 form-field">
            <FormInput
              label={"Bank Name"}
              name={"bankName"}
              type={"text"}
              value={values.bankName}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            {errors.bankName && touched.bankName ? (
              <h6 className="error">{errors.bankName}</h6>
            ) : null}
          </div>
          <div className="col form-field">
            <FormInput
              label={"Account Name"}
              name={"accountName"}
              type={"text"}
              value={values.accountName}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            {errors.accountName && touched.accountName ? (
              <h6 className="error">{errors.accountName}</h6>
            ) : null}
          </div>
          <div className="col form-field">
            <FormInput
              label={"Account Number"}
              name={"accountNumber"}
              type={"text"}
              handleBlur={handleBlur}
              value={values.accounntNumber}
              handleChange={handleChange}
            />
            {errors.accountNumber && touched.accountNumber ? (
              <h6 className="error">{errors.accountNumber}</h6>
            ) : null}
          </div>
        </div>
      )}
      <div>
        <button
          className={"btn btn-md btn-primary float-right"}
          type="submit"
          onSubmit={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              style={{ fontSize: 15, marginRight: 10 }}
            />
          ) : (
            ""
          )}
          {isSubmitting ? "Processing..." : "Send Payment"}
        </button>
      </div>
      <ModalView
        show={show}
        setShow={setShow}
        data={data}
        Proceed={ProceedPayment}
        resetForm={resetForm}
        formData={formData}
      />
    </form>
  );
}

const FormInput = (props)=>{
	const { name, label, type, value, handleChange, handleBlur } = props;
	return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        className={"form-control input"}
        id={name}
        type={type}
        name={name}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </>
  );
}

const AlertResp = (props) =>{
  const {title, text, icon, confirmButtonText } = props;
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  });
}

export default Form;

