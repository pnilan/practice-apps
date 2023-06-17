import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from './Cart.jsx'
import F1 from './F1.jsx';
import F2 from './F2.jsx';
import F3 from './F3.jsx';
import OrderSummary from './OrderSummary.jsx';


const App = () => {

  const [stage, setStage] = useState(0);
  const [user, setUser] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shippingAddressOne, setShippingAddressOne] = useState('');
  const [shippingAddressTwo, setShippingAddressTwo] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [billingCC, setBillingCC] = useState('');
  const [billingExpMonth, setBillingExpMonth] = useState(0);
  const [billingExpYear, setBillingExpYear] = useState(0);
  const [billingCVV, setBillingCVV] = useState(0);
  const [billingZip, setBillingZip] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    get('/api/responses');
  }, [])

  const get = (url) => {
    axios(url)
      .then((res) => {
        if (res.data.length) {
          var data = res.data[0];
          console.log(data);
          setUser(data.id);
          setName(data.name);
          setEmail(data.email);
          setPassword(data.password);
          setStage(data.stage);
          setCompleted(data.order_completed);
          if (data.shipping_address_1) {
            setShippingAddressOne(data.shipping_address_1);
          }
          if (data.shipping_address_2) {
            setShippingAddressTwo(data.shipping_address_2);
          }
          if (data.shipping_city) {
            setShippingCity(data.shipping_city);
          }
          if (data.shipping_state) {
            setShippingState(data.shipping_state);
          }
          if (data.shipping_zip) {
            setShippingZip(data.shipping_zip);
          }
          if (data.billing_cc) {
            setBillingCC(data.billing_cc);
          }
          if (data.billing_exp_month) {
            setBillingExpMonth(data.billing_exp_month)
          }
          if (data.billing_exp_year) {
            setBillingExpYear(data.billing_exp_year);
          }
          if (data.billing_cvv) {
            setBillingCVV(data.billing_cvv);
          }
          if (data.billing_zip) {
            setBillingZip(data.billing_zip);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const post = (url, data) => {
    axios.post(url, data)
      .then((res) => {
        console.log('created new record');
        setStage(stage + 1);
      })
      .catch((err) => {
        console.log(err);
        setStage(0);
      })
  };

  const update = (url, data) => {
    axios.put(url, data)
      .then((res) => {
        console.log('updated record');
        if (stage >= 4) {
          setStage(0);
          setCompleted(1);
        } else {
          setStage(stage + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        setStage(0);
      })
  };

  if (stage === 1) {
    // Render Account Creation Component
    return (
      <div className="container popup">
        <F1 name={name} email={email} password={password} stage={stage} setName={setName} setEmail={setEmail} setPassword={setPassword} setStage={setStage} post={post}/>
      </div>
    )
  } else if (stage === 2) {
    // Render Shipping Info Component
    return (
      <div className="container popup">
        <F2 shippingAddressOne={shippingAddressOne} setShippingAddressOne={setShippingAddressOne} shippingAddressTwo={shippingAddressTwo} setShippingAddressTwo={setShippingAddressTwo} shippingCity={shippingCity} setShippingCity={setShippingCity} shippingState={shippingState} setShippingState={setShippingState} shippingZip={shippingZip} setShippingZip={setShippingZip} stage={stage} setStage={setStage} update={update} />
      </div>
      )
  } else if (stage === 3) {
    // Render Billing Info Component
    return (
      <div className="container popup">
        <F3 billingCC={billingCC} setBillingCC={setBillingCC} billingExpMonth={billingExpMonth} setBillingExpMonth={setBillingExpMonth} billingExpYear={billingExpYear} setBillingExpYear={setBillingExpYear} billingCVV={billingCVV} setBillingCVV={setBillingCVV} billingZip={billingZip} setBillingZip={setBillingZip} stage={stage} setStage={setStage} update={update} />
      </div>
      )
  } else if (stage === 4) {
    // Render Order Summary Component
    return (
      <div className="container popup">
        <OrderSummary stage={stage} name={name} email={email} password={password} shippingAddressOne={shippingAddressOne} shippingAddressTwo={shippingAddressTwo} shippingCity={shippingCity} shippingState={shippingState} shippingZip={shippingZip} billingCC={billingCC} billingExpMonth={billingExpMonth} billingExpYear={billingExpYear} billingCVV={billingCVV} billingZip={billingZip} update={update} />
      </div>
      )
  } else {
    // Render Cart Component
    return (
      <div>
        <p>Hello, World!</p>
        <p>
          <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
        </p>
        <Cart setStage={setStage} completed={completed} />
      </div>
    );
  }

};

export default App;