import React, { useState } from 'react';

const Cart = ({setStage, completed}) => {

  const handleClick = () => {
    setStage(1);
  }

  return (
    <div className="container popup">
      <div className="row">
        <div className="col-1"></div>
        <div className="col product">
          <h4>
            HackReactor
          </h4>
          <h5>
            Full Time 12 Week Immersive
          </h5>
          <p>
            $17,860
          </p>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row checkout">
        <div className="col">
          { completed ? (<button type="button" className="btn btn-secondary" disabled>Checkout</button> ) : (<button type="button" className="btn btn-primary" onClick={handleClick}>Checkout</button>) }
        </div>
      </div>

    </div>
  )
}

export default Cart;