import React, { Fragment } from 'react';
import { Container, Row, Col, Badge } from 'reactstrap';

import BookmarkTree from '../components/bookmark-tree/bookmark-tree';
import BookmarkModal from '../components/bookmark-modal/bookmark-modal';
import Filters from '../components/filters/filters';

import { getBookmarksTree, updateBookmark } from '../services/bookmarks';
import { openNewTab } from '../services/tabs';
import {
  applyFilters,
  isFiltersEmpty,
  getTagList,
  processBookmark,
} from '../services/filters';

import './home.css';
import TagFilterModal from '../components/tag-filter-modal/tag-filter-modal';

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
      },
      showTagFilterModal: false,
    };
  }

  componentDidMount() {
    getBookmarksTree().then(nodes => {
      this.setState({
        bookmarks: nodes,
      });
    });
  }

  onClickBookmark = bookmark => {
    openNewTab(bookmark.url);
  };

  onEditClick = bookmark => {
    this.setState({
      selectedBookmark: bookmark,
    });
  };

  onClosedEditModal = () => {
    this.setState({
      selectedBookmark: null,
    });
  };

  onUpdateBookmark = (id, changes) => {
    updateBookmark(id, changes);
  };

  handleSearchChange = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        search: event.target.value,
      },
    });
  };

  handleStartDateChange = date => {
    this.setState({
      filters: {
        ...this.state.filters,
        startDate: date,
      },
    });
  };

  handleEndDateChange = date => {
    this.setState({
      filters: {
        ...this.state.filters,
        endDate: date,
      },
    });
  };

  handleTagFilterChange = tags => {
    console.log(tags);
    this.setState({
      filters: {
        ...this.state.filters,
        tags,
      },
    });
  };

  handleTagButtonClicked = () => {
    this.setState({
      showTagFilterModal: true,
    });
  };

  onClosedTagFilter = () => {
    this.setState({
      showTagFilterModal: false,
    });
  };

  render() {
    if (!this.state) return null;

    const bookmarks = applyFilters(
      processBookmark(this.state.bookmarks[0]),
      this.state.filters
    );

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
                startDate={this.state.filters.startDate}
                endDate={this.state.filters.endDate}
                tags={this.state.filters.tags}
                handleSearchChange={this.handleSearchChange}
                handleStartDateChange={this.handleStartDateChange}
                handleEndDateChange={this.handleEndDateChange}
                handleTagButtonClicked={this.handleTagButtonClicked}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="auto">
              {this.state.filters.tags.map((tag, index) => (
                <Badge color="primary" key={index} pill>
                  {tag}
                </Badge>
              ))}
            </Col>
          </Row>
          <Row>
            <Col xs="auto">
              <BookmarkTree
                bookmarks={bookmarks}
                isFilterActive={!isFiltersEmpty(this.state.filters)}
                onClickBookmark={this.onClickBookmark}
                onEditClick={this.onEditClick}
              />
            </Col>
          </Row>
        </Container>
        {this.state.selectedBookmark && (
          <BookmarkModal
            bookmark={this.state.selectedBookmark}
            onClosed={this.onClosedEditModal}
            onUpdateBookmark={this.onUpdateBookmark}
          />
        )}
        {this.state.showTagFilterModal && (
          <TagFilterModal
            allTags={getTagList()}
            selectedTags={this.state.filters.tags}
            handleTagFilterChange={this.handleTagFilterChange}
            onClosed={this.onClosedTagFilter}
          />
        )}
      </Fragment>
    );
  }
}

export default Home;
