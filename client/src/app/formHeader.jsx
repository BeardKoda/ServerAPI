import React from 'react';
import './form.css';

const FormHeader = () => {
	return (
    <div className="form-header text-center">
      <h2 style={{color:'black', textAlign:'center'}}>Transfer fund to A Friend</h2>
      <small>A small Form showing the use case of the Universal API to accept and send payments from anywhere.</small>
    </div>
  );
}
export default FormHeader;