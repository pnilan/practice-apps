import React, { useState } from 'react';

const F3 = ({ billingCC, setBillingCC, billingExpMonth, setBillingExpMonth, billingExpYear, setBillingExpYear, billingCVV, setBillingCVV, billingZip, setBillingZip, stage, setStage, update }) => {

  const [warning, setWarning] = useState('');

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = () => {
    if (isNaN(Number(billingCC))) {
      setWarning('Please enter a valid credit card number.')
    } else if (isNaN(Number(billingCVV))) {
      setWarning('Please enter a valid credit card CVV.')
    } else if (isNaN(Number(billingZip))) {
      setWarning('Please enter a valid credit card billing zip.')
    } else {
      setWarning('');
      var data = {
        billing_cc: billingCC,
        billing_exp_month: Number(billingExpMonth),
        billing_exp_year: Number(billingExpYear),
        billing_cvv: Number(billingCVV),
        billing_zip: Number(billingZip),
        stage: stage + 1,
      };
      update('/api/responses', data);
    }
  };

  return (
    <div className="container popup">
        <div className="row">
          <h5>Billing Details:</h5>
          <p>{ warning.length ? (<>{warning}</>) : (<></>) }</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <div className="form-group">
              <label>Credit Card #:</label>
              <input type="text" className="form-control" value={billingCC} onChange={(e) => handleChange(e, setBillingCC)} required/>
            </div>
            <div className="form-group">
              <label>CC Exp Month:</label>
              <select type="text" className="form-control" value={billingExpMonth} onChange={(e) => handleChange(e, setBillingExpMonth)} required>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className="form-group">
              <label>CC Exp Year:</label>
              <select type="text" className="form-control" value={billingExpYear} onChange={(e) => handleChange(e, setBillingExpYear)} required>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div className="form-group">
              <label>CVV:</label>
              <input type="text" className="form-control" value={billingCVV} onChange={(e) => handleChange(e, setBillingCVV)} required/>
            </div>
            <div className="form-group">
              <label>Zip:</label>
              <input type="text" className="form-control" value={billingZip} onChange={(e) => handleChange(e, setBillingZip)} required/>
            </div>
            <div className="row">
              <div className="col button-container">
                  <button type="submit" className="btn btn-primary">Confirm Billing</button>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
};

export default F3;