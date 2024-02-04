import courses from '../data/courses.json'
import React, { useState, ChangeEvent } from 'react';
import Cart from "./Cart"; 
import "./Courses.css"; 
import ShareCourses from "./ShareCourses"; 
export type CoursesArray = Course[] 

export interface Course { 
  id: number; 
  dept: string; 
  number: number; 
  title: string; 
  description: string; 
  prereqs?: string[]; 
  "cross-listed"?: string[]; 
} 

const Courses = () => {
  const initialCartState = courses.map(() => false);   // Initialize cart state for each course
  const [cart, setCart] = useState<any[]>([]); 
  const maxCoursesInCart = 7; // Maximum number of courses allowed in the cart
  const [open, setOpen] = useState(false); 
  const[searchQuery, setSearchQuery] = useState(''); 
  const[filterNumber, setFilterNumber] = useState(''); 

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleView = () => {
    setOpen(!open)
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterNumber(e.target.value);
  };

  const filteredCourses = courses.filter(( course ) => {
    // Filter based on search query
    const titleMatch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const descriptionMatch = course.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter based on course number
    const numberMatch = filterNumber === '' || course.number.toString() === filterNumber;

    return (titleMatch || descriptionMatch) && numberMatch;
  }); 

  // State to handle which course's description is expanded
  const [expandedDescription, setExpandedDescription] = useState<string | null>(null);
  
  const handleToggleCartClick = (courseIndex: number) => {
    const updatedCart = [...cart];
    const isCourseInCart = updatedCart[courseIndex];
  
    if (!isCourseInCart) {
      const numCoursesInCart = updatedCart.filter((item) => item).length;
      if (numCoursesInCart >= maxCoursesInCart) {
        alert('You cannot have more than 7 courses in your cart!');
        return;
      }
    }
  
    updatedCart[courseIndex] = !updatedCart[courseIndex]; // Toggle the state
    setCart(updatedCart);
  
    if (!updatedCart[courseIndex]) {
      alert('Removed from Cart'); 
    } 
  };  

  // Function to toggle description visibility for a specific course
  const toggleDescription = (courseId: string) => {
    setExpandedDescription(
      expandedDescription === courseId ? null : courseId
    ); 
  }; 

  return (
    <>
    <div className="courses-container">
      {/* Button to view cart */}
        <button className="view-cart-button" onClick={toggleView}>View Cart</button>
        {open && <Cart filteredCourses={filteredCourses} cart={cart} />}
        <div className="search-container"> 
          {/* Search input */}
          <input 
            className='fancy-search'
            type='text' 
            placeholder="Search by title or description"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {/* Number filter input */}
          <input
          className='fancy-search' 
            type='text'
            placeholder="Filter by number"
            value={filterNumber}
            onChange={handleFilterChange}
          />
      </div>
        {/* Render filtered courses */}
        {filteredCourses.map(({ dept, number, title, description, prereqs, "cross-listed": crossListed }, index) => (
        <div className="card" key={`${dept}-${number}`}>
          <div key={`${dept}-${number}`}>
            <br />
            <b>{dept} {number}: {title}</b>
            <br />

            {/* Toggleable description */}
            <div style={{ cursor: 'pointer' }} onClick={() => toggleDescription(`${dept}-${number}`)}>
              {expandedDescription === `${dept}-${number}` ? description : 'Click to expand description'}
            </div>

            {/* Prerequisites */}
            {prereqs && prereqs.length > 0 && (
              <>
                <br />
                <i> Prerequisites: {Array.isArray(prereqs) ? prereqs.join(', ') : prereqs} </i>
              </>
            )}

            {/* Cross-listed courses */}
            {crossListed && crossListed.length > 0 && (
              <>
                <br />
                Cross-listed: {crossListed.join(', ')}
              </>
            )}
            <div>
              {/* Add to cart button */} 
              <button className="add-cart-button" onClick={() => handleToggleCartClick(index)}>
                {cart[index] ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )};  

export default Courses;