import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import BookmarkTree from '../components/bookmark-tree/bookmark-tree';

import { getBookmarksTree } from '../services/bookmarks'

import './home.css';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bookmarks: []
    };
  }

  componentDidMount() {
    getBookmarksTree().then(nodes => {
      console.log(nodes);
      this.setState({
        bookmarks: nodes,
      });
    })
  }

  render() {
    if (!this.state) return null;

    return (
      <Container>
        <Row>
          <Col><h2>Welcome to Chiefmark</h2></Col>
        </Row>
        <Row>
          <Col xs="auto"><BookmarkTree bookmarks={this.state.bookmarks || [{}]}/></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;