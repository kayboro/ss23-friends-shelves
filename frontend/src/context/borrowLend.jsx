import { createContext, useState } from 'react';
import axios from 'axios';

const BorrowLendContext = createContext();

function BorrowLendProvider({ children }){

  let borrowingrequestsID = "";

  const handleLend = async (bookIDNumber) => {
  const userID = "64f09610fcc82a3f318948fc"
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
    } catch (e) {
      console.log(e)
      };
  }

  const cancelLend = async (bookIDNumber) => {

    const userID = "64f09610fcc82a3f318948fc"
    
    try{
      const input = {
        borrowingrequest: {
          requserid : userID,
          status: "declined",
          message: "sorry missclicked",
          }
      };
      const response = await axios.delete(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest/${borrowingrequestsID}`, input, { withCredentials: true });
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