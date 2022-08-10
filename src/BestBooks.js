import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */


  getBooks = async () => {
    console.log('we are right here!!!');
    try {

      let results = await axios.get(`${this.props.SERVER}/books`);
      console.log(results)
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

      console.log('Book Added ',createdBook);
      this.setState({
        books: [...this.state.books, createdBook.data]
      })
    } catch (error) {
      console.log('ERR: ', error.response.data);
    }
  }

  render() {

    let books = this.state.books.map(book => (
      <Card key={book._id}>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.description}</Card.Text>
        <Card.Text>{book.available ? 'Available' : 'Unavailable'}</Card.Text>
      </Card>
    ));

    let addForm =
      <Form onSubmit={this.handleBookSubmit}>
        <Form.Group controlId='title'>
          <Form.Label>Book Title</Form.Label>
          <Form.Control type='text' />
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control type='text' />
        </Form.Group>
        <Form.Group controlId='available'>
          <Form.Check type='checkbox' label='Available' />
        </Form.Group>
        <Button type='submit'>Add Book</Button>
      </Form>;


    return (
      <>
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
      </>
    )
  }
}

export default BestBooks;
