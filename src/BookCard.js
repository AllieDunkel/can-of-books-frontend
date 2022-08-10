import React from "react";
import { Card, Button } from 'react-bootstrap';

class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.book
        }
    }

    render() {
        let book = this.state.book;
        return (
            <>
                <Card className="row">
                    <Card.Title className='col-sm'>{book.title}</Card.Title>
                    <Card.Text className='col-md'>{book.description}</Card.Text>
                    <Card.Text className='col-sm'>
                        {book.available ? 'Available' : 'Unavailable'}
                    </Card.Text>
                    <Button className='col-sm' onClick={() => this.props.handleOnShowModal(this.state.book)}>Update</Button>
                </Card>
            </>
        )
    }
}

export default BookCard;