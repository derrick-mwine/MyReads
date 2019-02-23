import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BooksCategory from './BooksCategory'
import SearchView from './SearchView'
import * as BooksAPI from './BooksAPI'
import './App.css'

const categories = [
    {
        "title": "Currently Reading", 
        "id": "currentlyReading"
    },
    {
        "title": "Want to Read", 
        "id": "wantToRead"
    },
    {
        "title": "Read", 
        "id": "read"
    }
]

class BooksApp extends React.Component {
    state = {      
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
             this.setState({books})
        })
    }

    changeCategory = (book, shelf) => {
        if (this.state.books) {
            BooksAPI.update(book,shelf).then(() => {
                book.shelf = shelf;
                this.setState(state => ({
                    books: state.books.filter(b => b.id !== book.id).concat([book])
                }))
            })
        }
    }
    
    render() {
       
        const {books} = this.state
               
        return (
            <div className="app" role="main">
                <div className="list-books">            
                    <div className="list-books-title">
                        <h1 tabIndex="0">My Reads</h1>
                    </div>
            
                    <Route exact path="/" render={(history) => (
                        <div>
                            <BooksCategory                                
                                onChangeCategory={this.changeCategory}
                                books={books}
                                categories={categories}
                            />
                        </div>
                    )}/>
                        
                    <Route path="/search" render={(history) => (
                        <div>
                            <SearchView
                                books={books}
                                onChangeCategory={this.changeCategory}
                                />
                        </div>
                    )} />

                </div>

                <div className="open-search">
                    <Link to="/search" className="search">Add a book</Link>
                </div>
                
            </div>
        )
    }
}

export default BooksApp
