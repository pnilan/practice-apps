import React, { useState } from 'react';

const F2 = ({shippingAddressOne, setShippingAddressOne, shippingAddressTwo, setShippingAddressTwo, shippingCity, setShippingCity, shippingState, setShippingState, shippingZip, setShippingZip, stage, setStage, update}) => {

  const [ warning, setWarning ] = useState('');

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = () => {
    if (!isNaN(Number(shippingZip))) {
      var data = {
        shipping_address_1: shippingAddressOne,
        shipping_address_2: shippingAddressTwo,
        shipping_city: shippingCity,
        shipping_state: shippingState,
        shipping_zip: Number(shippingZip),
        stage: stage + 1
      };
      update('/api/responses', data);
    } else {
      setWarning('Please enter a valid zip code.')
    }
  };

  return (
    <div className="container popup">
    <div className="row">
      <h5>Shipping Details:</h5>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <div className="form-group">
          <label>Address 1:</label>
          <input type="text" className="form-control" value={shippingAddressOne} onChange={(e) => handleChange(e, setShippingAddressOne)} required/>
        </div>
        <div className="form-group">
          <label>Address 2:</label>
          <input type="text" className="form-control" value={shippingAddressTwo} onChange={(e) => handleChange(e, setShippingAddressTwo)} required/>
        </div>
        <div className="form-group">
          <label>City:</label>
          <input type="text" className="form-control" value={shippingCity} onChange={(e) => handleChange(e, setShippingCity)} required/>
        </div>
        <div className="form-group">
          <label>State:</label>
          <select type="select" className="form-select" value={shippingState} onChange={(e) => handleChange(e, setShippingState)} required>
            <option value="">Select</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className="form-group">
          <label>Zip:</label>
          <input type="text" className="form-control" value={shippingZip} onChange={(e) => handleChange(e, setShippingZip)} required/>
          { warning.length ? ( <small>{warning}</small>) : ( <></> ) }
        </div>
        <div className="row">
          <div className="col button-container">
              <button type="submit" className="btn btn-primary">Confirm Shipping</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
};

export default F2;