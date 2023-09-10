import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import BookCreate from './components/BookCreate'
import BookList from './components/BookList'
import './App.css'
import BookSearch from './components/BookSearch';
import NavBar from './components/NavBar';
import LoginRegisterForm from './components/LoginRegister/LoginRegisterForm';


function App() {
  
  //start arrays for books in database and searchquery
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  

  //Register users that are registring 
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);

  //Fetching books from user
  const fetchBooks = async(showBooks) => {
    const response = await axios.get('http://localhost:3001/books');

    if(showBooks === "mine"){
      const updatedBooks = response.data.filter((book) => {
        return book.user === loggedInUser[0].username;
      });
      setBooks(updatedBooks);
    }
    else{
      setBooks(response.data);
    }
    
  };

  const handleFetchBooks = (showBooks) =>{    
    
    fetchBooks(showBooks);
    
  };

  //Edit book by ID
  const editBookById = async (id, newTitle, newAuthor, newISBN, newBlurb) => {

    const response = await axios.put(`http://localhost:3001/books/${id}`, {
        title: newTitle,
        author: newAuthor,
        isbn: newISBN,
        blurb : newBlurb
    });

    const updatedBooks = books.map((book) =>{
        if(book.id === id){
            return {...book, ...response.data};
        }

        return book;
    });
    setBooks(updatedBooks);

  };

  //function for deleting books when delete button is pressed, delete book from array
  const deleteBookById = async (id) =>{

      await axios.delete(`http://localhost:3001/books/${id}`);

      const updatedBooks = books.filter((books) => {
          return books.id !== id;
      });
      setBooks(updatedBooks);
  }

    //function to map titles that adhere to search query coming from booklist>booksearch 
  const searchBook = (title) =>{
    if(title && title.length > 1){
      const searchBooksTitle = books.filter((books) => {
        return books.title.includes(title);
      });
      setSearchBooks(searchBooksTitle)
      if(searchBooksTitle.length == 0){
        const searchBooksTitle = books.filter((books) => {
          return books.author.includes(title);
        });
        setSearchBooks(searchBooksTitle)
      
        if(searchBooksTitle.length == 0){
          const searchBooksTitle = books.filter((books) => {
            return books.ISBN.includes(title);
          });
          setSearchBooks(searchBooksTitle)
        }
      }
    }
    else{
      setSearchBooks([])
    }
    
  }

  //function for adding books to array when books are created
  const createBook = async (title, author, ISBN, blurb, user) =>{
    const response = await axios.post('http://localhost:3001/books', {title, author, ISBN, blurb, user});

    const updatedBooks = [
      ...books, response.data
  ];
  setBooks(updatedBooks);
  }

  //Handle login and password validation
  const[showLogin, setShowLogin] = useState(true);
  const[loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    const searchUsers = users.filter((users) => {
      return users.username == username && users.password == password;
    });
    
    if(String(searchUsers[0].password) == String(password)){
      setLoggedInUser(searchUsers);
      setLoggedIn(true);
      handleFetchBooks("mine");
        }  
    if(loggedIn === true){
      setShowLogin(false);
    }
  };

  const handleRegister = async (username, password, passwordConfirm) => {
      const response = await axios.post('http://localhost:3001/users', {username, password, passwordConfirm});

      const updatedUsers = [
        ...users, response.data
    ];
    setUsers(updatedUsers);
      
  }

  //Fetching users database
  const fetchUsers = async() => {
    const response = await axios.get('http://localhost:3001/users');

    const updatedUsers = response.data;
    setUsers(updatedUsers);
  };

  useEffect (() => {
    fetchUsers();
  }, []);

  


  let showPage = <div><NavBar /> <LoginRegisterForm onSubmit={handleLogin} onRegister={handleRegister}/></div>

  if(showLogin == false){
    showPage = 
    <div>
      <NavBar handleFetchBooks = {handleFetchBooks} setShowLogin = {setShowLogin}/> 
      <BookSearch onSearch={searchBook} />
      <BookCreate user = {loggedInUser[0].username} onCreate={createBook} /> 
      <BookList books={books} searchBooks = {searchBooks} onDelete={deleteBookById} onEdit={editBookById} onSearch={searchBook} user = {loggedInUser} />
  </div>
  }

  return (showPage)
      
}

export default App