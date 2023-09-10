import { useState } from 'react';



function BookSearch({onSearch}){

    //Handle search querys coming in via the booksearch form
    const [formData, setFormData] = useState({title: ""})

    const handleChange = (event) => {
        const changedField = event.target.name;
        const newValue = event.target.value;
        setFormData(currData => {
            currData[changedField] = newValue;
            return{...currData};  
        })
        onSearch(formData.title)
        console.log(formData)
    }

    //Book search form
    return(<div>
        
        <form className = "searchForm">
            <p>
                <label>Book Search</label>
                <input 
                type = "text"
                placeholder = "Title, Author or ISBN" 
                className="input" 
                value = {formData.title} 
                onChange = {handleChange}
                name = "title"
                id="title"
                />
            </p>
        </form>

    </div>)
}

export default BookSearch;