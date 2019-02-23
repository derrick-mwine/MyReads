import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchView extends Component {
    state = {
        query: '',
        books: [],
        filteredBooks: []
    }

    updateQuery = (query) => {
        this.setState({query})
            if(query){
                BooksAPI.search(query).then((books) => {
                    if(books instanceof Array)  {
                        //add books to state
                        this.setState({books})
                    }
                    else {
                        //set book state to empty array
                        this.setState({books: []})
                    }

                }
            )
        }
    }

    render() {

        const {onChangeCategory} = this.props
        const {query, books} = this.state 

        /*const yourBooksID = this.props.books.map(b => b.id);
        let books = this.state.books.filter(b => !yourBooksID.includes(b.id)); */

        return (
            <div>
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <form>
                    <div className="search-books-input-wrapper">
                        <input type='text' placeholder='Search books by title or author' value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </form>
            </div>
           {books.length!==0 && (
                <div className="search-books-results">
                    <div className="search-books">
                        <ol className="books-grid">
                            {books.map((book) => (
                                <li key={book.id}>
                                    <Book
                                        onChangeCategory={onChangeCategory}
                                        book = {book}
                                    />
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
               )}
               {(books.length===0 && query.length!==0) && (
               <div className="search-results">
                    {`No book found`}
                </div>
               )}
            </div>

        )
    }

}

export default SearchView
