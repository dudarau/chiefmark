import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';

import BookmarkTree from '../components/bookmark-tree/bookmark-tree';
import BookmarkModal from '../components/bookmark-modal/bookmark-modal';

import { getBookmarksTree } from '../services/bookmarks';

import './home.css';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bookmarks: [],
    };
  }

  componentDidMount() {
    getBookmarksTree().then(nodes => {
      console.log(nodes);
      this.setState({
        bookmarks: nodes,
      });
    });
  }

  onClickBookmark = bookmark => {
    this.setState({
      selectedBookmark: bookmark,
    });
  };

  render() {
    if (!this.state) return null;

    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <h2>Welcome to Chiefmark</h2>
            </Col>
          </Row>
          <Row>
            <Col xs="auto">
              <BookmarkTree
                bookmarks={this.state.bookmarks || [{}]}
                onClickBookmark={this.onClickBookmark}
              />
            </Col>
          </Row>
        </Container>
        {this.state.selectedBookmark && (
          <BookmarkModal bookmark={this.state.selectedBookmark} />
        )}
      </Fragment>
    );
  }
}

export default Home;
