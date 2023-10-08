import BookEdit from './BookEdit';
import { useState, useContext, useEffect } from 'react';
import BooksContext from '../context/books';
import NavigationContext from '../context/navigation';
import BorrowLog from './BorrowLog';


function BookShowSingle() {

    const { deleteBookById, bookInfo, singleBook } = useContext(BooksContext);
    const { currentPath, navigate } = useContext(NavigationContext);
    const [borrowLog, setBorrowLog] = useState();

    useEffect(() => {
        bookInfo(currentPath);
      }, [currentPath]);

    //Handle the edit menu for every book
    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
        deleteBookById(singleBook._id);
        navigate("/mybooks");      
    }

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    //Handle submissions for edits
    const handleSubmit = () => {
        setShowEdit(false);
    }


    //Show the book as object
    let content = <div className = "singleBookPage" key={singleBook._id}><p><img className='bookCover' src={singleBook.image} /></p><b>{singleBook.title}</b><p>{singleBook.author}</p>{singleBook.isbn}<p>{singleBook.blurb}</p></div>

    let actions = <></>;
    if (singleBook.owner){
    actions =
        <div className="actions">
            <p>
                <button className="edit" onClick={handleEditClick}>
                    Edit
                </button>
                <button className="delete" onClick={handleDeleteClick}>
                    Delete
                </button>
            </p>
        </div>
        };


    useEffect(() => {
        if(Object.keys(singleBook).length> 0){
            setBorrowLog(<BorrowLog bookData={singleBook}/>);    
        };
    }, [singleBook])  
       
    

    if (showEdit) {
        content = <BookEdit onSubmit={handleSubmit} book={singleBook} />;
        actions = <></>;
    }

    //Show book or edit menu for each book{borrowLog}{actions}
    return <div>
        {content}
        {actions}
        {borrowLog}
    </div>
}

export default BookShowSingle;