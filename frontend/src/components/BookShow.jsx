import BookLink from './Navigation/Link';

function BookShow({ book }) {

    
    let content = <div key={book._id}>
        <BookLink key={book._id} to={book._id}><img className='bookCover' src = {book.image} /><p><b>{book.title}</b></p></BookLink>
    </div>
        ;

    let actions = <></>    
    
    //Show book or edit menu for each book
    return <div className="book-show">
        {content}
        {actions}
    </div>
}

export default BookShow;