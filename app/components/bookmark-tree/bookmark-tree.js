import React from 'react';
import { Table } from 'reactstrap';

import BookmarkFolder from '../bookmark-folder/bookmark-folder';

class BookmarkTree extends React.Component {
  render() {
    return (
      <Table>
        <tbody>
          <BookmarkFolder
            bookmark={this.props.bookmarks}
            isFilterActive={this.props.isFilterActive}
            level={0}
            onClickBookmark={this.props.onClickBookmark}
          />
        </tbody>
      </Table>
    );
  }
}

export default BookmarkTree;
