import React from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import { Form, Button, Container, Modal } from 'react-bootstrap';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books,
      showUpdateModal: false,
      bookToUpdate: {},
      checkBox: false
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */


  handleOnShowModal = (book) => {
    this.setState({
      showUpdateModal: true,
      bookToUpdate: book,
      checkBox: book.available
    })
  }

  handleOnHide = () => {
    this.setState({
      showUpdateModal: false
    })
  }

  getBooks = async () => {
    try {

      let results = await axios.get(`${this.props.SERVER}/books`);
      this.setState({
        books: results.data
      })
    } catch (error) {
      console.log('we have an error: error.response.data')
    }
  }

  handleBookSubmit = async (event) => {
    event.preventDefault();
    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      available: event.target.available.checked,
    }
    this.postBook(newBook);
  }

  postBook = async (newBookObject) => {
    try {
      let url = `${this.props.SERVER}/books`;

      let createdBook = await axios.post(url, newBookObject);

      console.log('Book Added ', createdBook);
      this.setState({
        books: [...this.state.books, createdBook.data]
      })
    } catch (error) {
      console.log('ERR: ', error.response.data);
    }
  }

  toggleAvailable = (event) => {
    console.log(event.target);
    this.setState({
      checkBox: !this.state.checkBox
    }) 
  }


  updateBookSubmit = (event) => {
    event.preventDefault();
    console.log()
    let bookToSend = {
      title: event.target.updateTitle.value || this.props.bookToUpdate.title,
      description: event.target.updateDescription.value || this.props.bookToUpdate.description,
      available: event.target.updateAvailable.checked || this.props.bookToUpdate.available
    }

    this.updateBook(bookToSend);
  }

  updateBook = (book) => {
    try {
      let url = `${this.props.SERVER}/books/${book._id}`;
      console.log(url);
    } catch (error) {
      
    }
  }

  render() {

    let books = this.state.books.map(book => (
      <BookCard key={book._id} book={book} handleOnShowModal={this.handleOnShowModal} />
    ));

    let addForm =
      <Form onSubmit={this.handleBookSubmit}>
        <Form.Group controlId='title'>
          <Form.Label>Book Title</Form.Label>
          <Form.Control type='text' />
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control type='text'/>
        </Form.Group>
        <Form.Group controlId='available'>
          <Form.Check type='checkbox' label='Available' />
        </Form.Group>
        <Button type='submit'>Add Book</Button>
      </Form>;


    return (
      <Container>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <>
            {books}
            <div>
              {addForm}
            </div>
          </>
        ) : (
          <>
            <h3>No Books Found :</h3>
            <div>
              {addForm}
            </div>
          </>
        )}
        {this.state.showUpdateModal ? <Modal show={this.state.showUpdateModal} onHide={this.handleOnHide}>
          <Modal.Header closeButton>Update</Modal.Header>
          <Form onSubmit={this.updateBookSubmit}>
            <Form.Group controlId='updateTitle'>
              <Form.Label>Book Title</Form.Label>
              <Form.Control type='updateText' placeholder={this.state.bookToUpdate.title}/>
            </Form.Group>
            <Form.Group controlId='updateDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' placeholder={this.state.bookToUpdate.description}/>
            </Form.Group>
            <Form.Group controlId='updateAvailable'>
              <Form.Check type='checkbox' label='Available'  checked={this.state.checkBox} onChange={this.toggleAvailable}/>
            </Form.Group>
            <Button type='submit'>Update Book</Button>
          </Form>
        </Modal>
          : <></>
        }

      </Container>
    )
  }
}

export default BestBooks;
