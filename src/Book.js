import React, { Component } from 'react'

class Book extends Component {

    state = {
        display: 'none'
    }

    openPopup = () => {
        this.setState({
          display: 'block'
        })
    }

    closePopup = () => {
        this.setState({
          display: 'none'
        })
    }

    render() {

        const {book, onChangeCategory} = this.props

        return (
            <div>
            <div className="book">
                <div className="book-top">
                {book.imageLinks && <div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>}
                <div className="book-shelf-changer">
                    <select tabIndex="0" ref={book.shelf} aria-label="Choose category for book" className="select-shelf" value={book.shelf} onChange={(event) => onChangeCategory(book, event.target.value)}>>
                        <option value="disabled">Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
          {book.title && <div className="book-title" tabIndex="0">{book.title}</div>}
          {book.authors && <div className="book-authors" tabIndex="0">{book.authors}</div>}
          <p className="details" onClick={this.openPopup}>More details »</p>
        </div>
        <div className="book-details" style={{display:this.state.display}}>
                {book.imageLinks && <div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>}
                {book.title && <div className="book-title-details" tabIndex="0">{book.title}</div>}
                {book.authors && <div className="book-authors-details" tabIndex="0">{book.authors}</div>}
                {book.description && <div className="book-pageCount-details" tabIndex="0">{book.description}</div>}
                {book.pageCount && <div className="book-pageCount-details" tabIndex="0">Page count: {book.pageCount}</div>}

                {book.canonicalVolumeLink&&(<div><a className="book-link-details" target="_blank" href = {`${book.canonicalVolumeLink}`}>Visit the page about this book »</a></div>)}


                <span className="close" onClick={this.closePopup}>Close X</span>
            </div>
        </div>
        )
    }
}

export default Book
