import { createContext, useState } from 'react';
import axios from 'axios';

const BorrowLendContext = createContext();

function BorrowLendProvider({ children }){

  const handleLend = async (bookIDNumber, message) => {    
    try{
      const input = {
        borrowingrequest: {
          status: "home",
          message: `${message}`,
          dueDate: "2023-11-20"
          }
      };
      const response = await axios.post(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest`, input, { withCredentials: true });
      console.log(response);
    } catch (e) {
      console.log(e)
      };
  }

  const cancelLend = async (bookIDNumber) => {
    
    try{
      const input = {
        borrowingrequest: {
          status: "declined",
          message: "sorry missclicked",
          }
      };
      const response = await axios.delete(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest/`, input, { withCredentials: true });
      console.log(response);
    } catch (e) {
      console.log(e)
      };
  }

  const statusLend = async (bookIDNumber) => {
      
    const response = await axios.get(`http://localhost:8080/books/${bookIDNumber}`, { withCredentials: true });
      
      if(response.data == undefined){
        console.log("no borrow requests at the moment");
      }
      else
      {
        console.log(response.data.borrowingrequests);
      }      
  }

  const acceptLend = async (bookIDNumber, borrowingRequestID) => {
   try{
    const input = {
      borrowingrequest: {
        status: "transferLtoB",
        message: "sure you can have it",
        dueDate: "2023-11-18"
        }
    };

    console.log(bookIDNumber);
    console.log(borrowingRequestID);
    const response = await axios.post(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest/${borrowingRequestID}`, input, { withCredentials: true });
    console.log(response.data);
  } catch(e){
    console.log(e);
  }

  }

  const declineLend = async (bookIDNumber, borrowingRequestID) => {
    try{
     const input = {
       borrowingrequest: {
         status: "declined",
         message: "no sorry",
         dueDate: "2023-11-18"
         }
     };
 
     console.log(bookIDNumber);
     console.log(borrowingRequestID);
     const response = await axios.post(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest/${borrowingRequestID}`, input, { withCredentials: true });
     console.log(response.data);
   } catch(e){
     console.log(e);
   }
 
   }

  



  const valueToShare = {
    handleLend,
    cancelLend,
    statusLend,
    acceptLend,
    declineLend
    
}

    return <BorrowLendContext.Provider value={valueToShare}>
        { children }
    </BorrowLendContext.Provider>

}

export { BorrowLendProvider };
export default BorrowLendContext;