import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';

import BookmarkTree from '../components/bookmark-tree/bookmark-tree';
import BookmarkModal from '../components/bookmark-modal/bookmark-modal';
import Filters from '../components/filters/filters';

import { getBookmarksTree } from '../services/bookmarks';
import { applyFilters, isFiltersEmpty } from '../services/filters';

import './home.css';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bookmarks: [],
      filters: {
        search: '',
        startDate: null,
        endDate: null,
        tags: [],
      }
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

  handleSearchChange = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        search: event.target.value,
      }
    });
  };

  handleStartDateChange = (date) => {
    this.setState({
      filters: {
        ...this.state.filters,
        startDate: date,
      }
    });
    this.forceUpdate();
  };

  handleEndDateChange = (date) => {
    this.setState({
      filters: {
        ...this.state.filters,
        endDate: date,
      }
    }, () => {
      this.forceUpdate();
    });
  };

  render() {
    if (!this.state) return null;

    const bookmarks = applyFilters(this.state.bookmarks[0], this.state.filters);

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
              <Filters
                search={this.state.filters.search}
                handleSearchChange={this.handleSearchChange}
                handleStartDateChange={this.handleStartDateChange}
                handleEndDateChange={this.handleEndDateChange}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="auto">
              <BookmarkTree
                bookmarks={bookmarks}
                isFilterActive={!isFiltersEmpty(this.state.filters)}
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
