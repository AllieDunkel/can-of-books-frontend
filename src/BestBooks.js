import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

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

  render() {
    let books = this.state.books.map(book => (
      <Card key={book._id}>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.description}</Card.Text>
      </Card>
    ));



    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <>
            {books}
          </>
        ) : (
          <h3>No Books Found :</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
