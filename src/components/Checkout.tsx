import React from 'react';
import Courses from "./Courses"; 
import "./Courses.css"; 
import "./Checkout.css"; 

const Checkout = ({ cart, shippingAddress }: { cart: any[], shippingAddress: string }) => {
  return (
    <div className='card-container'>
      <h2>Checkout Page</h2>

      <h3>Items in Cart:</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index}> 
            {item.name} - Quantity: {item.quantity} - Total: ${item.quantity * item.price}
          </li>
        ))}
      </ul>

      <h3>Shipping Address:</h3>
      <p>{shippingAddress}</p>

      <button>Confirm Purchase</button>
    </div>
  );
};

export default Checkout;