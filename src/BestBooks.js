import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  
  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  

  getBooks = async () => {
    console.log('we are right here!!!');
    try{
      let results= await axios.get(`${this.props.SERVER}/books`);
      console.log(results)
      this.setState({
        books: results.data
      })
    } catch(error){
      console.log('we have an error: error.response.data')
    }
  }

  render() {

    console.log(this.state.books);
    let books = this.state.books.map(book => (
      <Card key={book._id}>
        <Card.Title>book.title</Card.Title>
        <Card.Text>book.description</Card.Text>
        <Card.Checkbox value={book.available} readOnly='true'/>
      </Card>
    ));

    

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            {books}
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        ) : (
          <h3>No Books Found :</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
