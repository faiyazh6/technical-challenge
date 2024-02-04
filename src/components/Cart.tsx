import { Link } from 'react-router-dom';
import "./Cart.css"; // Import the cart CSS file

interface Course {
  dept: string; 
  number: number;
}

const Cart = ({ filteredCourses, cart }: any) => {
  return (
  <div className="cart-container">
    <div className="cart-header">
      <h4>Course Cart</h4>
    </div>
    <div className="cart-items">
      {filteredCourses.map(({ dept, number, title }: any, index: number) => (
        cart[index] ? (
          <div className="colored-card" key={`${dept}-${number}`}>
            <div className="cart-item">
              <div>{dept} {number}</div>
            </div>
          </div>
        ) : null
      ))}
    </div>
    <div className="checkout-button">
      <Link to="/checkout">
        <button className="checkout-button">Checkout</button>
      </Link>
    </div>
  </div> 
  )
}
export default Cart;