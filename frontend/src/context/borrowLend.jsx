import { createContext, useState } from 'react';
import axios from 'axios';

const BorrowLendContext = createContext();

function BorrowLendProvider({ children }){

  let borrowingrequestsID = "";

  const handleLend = async (bookIDNumber) => {
  const userID = "64f0969dfcc82a3f3189491a"
  console.log(bookIDNumber);
    
    try{
      const input = {
        borrowingrequest: {
          requserid : userID,
          status: "home",
          message: "I'd like to borrow your book, please",
          dueDate: "2023-11-20"
          }
      };
      const response = await axios.post(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest`, input, { withCredentials: true });
      console.log(response);
      borrowingrequestsID = response.data.borrowingrequests[0]._id
      const responseBook = await axios.get(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest`, input, { withCredentials: true });
      console.log(responseBook);
    } catch (e) {
      console.log(e)
      };
  }

  const cancelLend = async (bookIDNumber) => {

    const userID = "64f0969dfcc82a3f3189491a"
    
    try{
      const input = {
        borrowingrequest: {
          requserid : userID,
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


  const valueToShare = {
    handleLend,
    cancelLend,
    
}

    return <BorrowLendContext.Provider value={valueToShare}>
        { children }
    </BorrowLendContext.Provider>

}

export { BorrowLendProvider };
export default BorrowLendContext;