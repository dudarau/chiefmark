import React from 'react';
import { Table } from 'reactstrap';

import BookmarkFolder from '../bookmark-folder/bookmark-folder';

import './bookmark-tree.css';

class BookmarkTree extends React.Component {
  render() {
    return (
      <Table className="bookmark-tree" borderless hover>
        <thead>
          <tr>
            <th className="title-column"></th>
            <th>created</th>
            <th>last opened</th>
            <th>tags</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.bookmarks &&
            this.props.bookmarks.children &&
            this.props.bookmarks.children.map((bookmark, index) => (
              <BookmarkFolder
                key={index}
                bookmark={bookmark}
                isFilterActive={this.props.isFilterActive}
                level={0}
                onClickBookmark={this.props.onClickBookmark}
                onEditClick={this.props.onEditClick}
              />
            ))}
        </tbody>
      </Table>
    );
  }
}

export default BookmarkTree;
