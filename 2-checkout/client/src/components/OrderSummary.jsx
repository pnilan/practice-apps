import React from 'react';

const OrderSummary = ({stage, name, email, password, shippingAddressOne, shippingAddressTwo, shippingCity, shippingState, shippingZip, billingCC, billingExpMonth, billingExpYear, billingCVV, billingZip, update}) => {

  const handleSubmit = () => {
    var data = {
      order_completed: 1,
      stage: 0,
    };
    update('/api/responses', data);
  };

  return (
  <div className="container popup">
    <div className="row">
      <h4>Order Summary:</h4>
    </div>
    <div className="row">
      <div className="col-4">
        <h5>User</h5>
        <p>
          Name: {name}
        </p>
        <p>
          Email: {email}
        </p>
        <p>
          Password: {password}
        </p>
      </div>
      <div className="col-4">
        <h5>Shipping</h5>
        <p>
          Address 1: {shippingAddressOne}
        </p>
        <p>
          Address 2: {shippingAddressTwo}
        </p>
        <p>
          City: {shippingCity}
        </p>
        <p>
          State: {shippingState}
        </p>
        <p>
          Zip: {shippingZip}
        </p>
      </div>
      <div className="col-4">
        <h5>Billing</h5>
        <p>
          Credit Card: {billingCC}
        </p>
        <p>
          Expiration: {billingExpMonth}/{billingExpYear}
        </p>
        <p>
          CVV: {billingCVV}
        </p>
        <p>
          Zip: {billingZip}
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col button-container">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            }}>
            <button type="submit" className="btn btn-primary">Confirm Billing</button>
          </form>
      </div>
    </div>
  </div>

  )
};

export default OrderSummary;