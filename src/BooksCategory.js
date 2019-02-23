import React, {Component } from 'react'
import Book from './Book'

class BookCategory extends Component {
    render() {
        return(
            <div className="list-books-content"> 
            {this.props.categories.map((category) => 
                <div className="bookshelf" key={category.id}>
                    <h2 className="bookshelf-title">{category.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.filter(book => book.shelf === category.id).map((book) => (
                            <li key={book.id}>                        
                                <Book 
                                    books = {this.props.books}
                                    onChangeCategory={this.props.onChangeCategory}
                                    book = {book}
                                />
                            </li>
                            ))}
                        </ol>              
                    </div>
                </div>       
            )}
            </div>
        ) 
    }
}

export default BookCategory