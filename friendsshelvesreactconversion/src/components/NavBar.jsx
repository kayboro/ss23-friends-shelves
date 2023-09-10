import { useState } from 'react';
import bookImage from '../assets/images/book.png';
import bookShelves from '../assets/images/bookshelves.png';
import logout from '../assets/images/logout.png';


function NavBar({handleFetchBooks, setShowLogin}){


        const handleShowAllBooks = () =>{
                handleFetchBooks("all"); 
        };
        
        const handleShowMyBooks = () =>{
                handleFetchBooks("mine");
        };  

        const handleLogout = () =>{
                setShowLogin(true);
        };
   
   //Show navbar 
    return(<div className= "navBar">
            <img  id='logo' src = {bookImage} />
            <a className="nav-link" onClick = {handleShowAllBooks}> <img  className = 'linkImage' src = {bookShelves} /> All Books</a>
            <a className="nav-link" onClick = {handleShowMyBooks}> <img  className = 'linkImage' src = {bookImage} /> My Bookshelf</a>
            <a className="nav-link" onClick = {handleLogout}> <img  className = 'linkImage' src = {logout} /> Logout</a>         
    </div>)
        
}

export default NavBar;