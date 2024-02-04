import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Courses, { CoursesArray } from './components/Courses';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Nav from './components/Nav';
import React, { useState, ChangeEvent } from 'react';
import './App.css';
import './components/Courses.css';
import ShareCourses from './components/ShareCourses'; // Import the ShareCourses component

function App() {
  const [filteredCourses] = useState<CoursesArray[]>([]);
  const [cartItems, setCartItems] = useState<CoursesArray[]>([]); // Update cartItems type
  const [shippingAddress, setShippingAddress] = useState<string>(
    '3333 WALNUT ST, RM #123456 PHILADELPHIA PA 19104-6193'
  );

  return (
    <>
      <Router>
        <Nav />
        <div style={{ width: '100%', boxSizing: 'border-box', padding: '0 calc(1rem + 10%)' }}>
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/cart" element={<Cart cart={cartItems} />} />
            <Route path="/checkout" element={<Checkout cart={cartItems} shippingAddress={shippingAddress} />} />
            <Route path="/share-courses" element={<ShareCourses selectedCourses={[]} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;