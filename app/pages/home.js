import React, { Fragment } from 'react';
import moment from 'moment';
import { Container, Row, Col, Badge } from 'reactstrap';

import BookmarkTree from '../components/bookmark-tree/bookmark-tree';
import BookmarkModal from '../components/bookmark-modal/bookmark-modal';
import Filters from '../components/filters/filters';

import {
  deleteBookmark,
  getBookmarksTree,
  updateBookmark,
} from '../services/bookmarks';
import { addListener, removeListener } from '../services/bookmark-listeners';
import { openNewTab } from '../services/tabs';
import {
  applyFilters,
  isFiltersEmpty,
  getTagList,
  processBookmark,
  composeTitle,
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
    this.updateTree();
    addListener(() => {
      this.updateTree();
    });
  }

  componentWillUnmount() {
    removeListener(() => {
      this.updateTree();
    });
  }

  onClickBookmark = bookmark => {
    openNewTab(bookmark.url);
    updateBookmark(bookmark.id, {
      title: composeTitle(bookmark.title, bookmark.tags, Date.now()),
      url: bookmark.url,
    }).then(() => {
      this.updateTree();
    });
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

  updateTree = () => {
    getBookmarksTree().then(nodes => {
      this.setState({
        bookmarks: nodes,
      });
    });
  };

  onUpdateBookmark = (id, changes) => {
    updateBookmark(id, changes).then(() => {
      this.updateTree();
    });
  };

  onDeleteBookmark = id => {
    deleteBookmark(id).then(() => {
      this.updateTree();
    });
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
    this.setState({
      filters: {
        ...this.state.filters,
        tags,
      },
    });
  };

  handleTodayButtonClick = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        startDate: moment().startOf('day'),
        endDate: null,
      },
    });
  };

  handleOldLinksButtonClick = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        startDate: null,
        endDate: moment().subtract(1, 'years'),
      },
    });
  };

  handleResetClick = () => {
    this.setState({
      filters: {
        search: '',
        startDate: null,
        endDate: null,
        tags: [],
      },
    });
  };

  handleTagButtonClick = () => {
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
        <div className="filter-row">
          <Filters
            search={this.state.filters.search}
            startDate={this.state.filters.startDate}
            endDate={this.state.filters.endDate}
            tags={this.state.filters.tags}
            handleSearchChange={this.handleSearchChange}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            handleTagButtonClick={this.handleTagButtonClick}
            handleTodayButtonClick={this.handleTodayButtonClick}
            handleOldLinksButtonClick={this.handleOldLinksButtonClick}
            handleResetClick={this.handleResetClick}
          />
        </div>
        <Container>
          <Row className="selected-tags-row">
            <Col md={{ size: 10, offset: 2 }}>
              {this.state.filters.tags.map((tag, index) => (
                <Badge color="primary" key={index} pill>
                  {tag}
                </Badge>
              ))}
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
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
            onDeleteBookmark={this.onDeleteBookmark}
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
