import React from 'react';
import { Table } from 'reactstrap';

import BookmarkFolder from '../bookmark-folder/bookmark-folder';

class BookmarkTree extends React.Component {
  render() {
    return (<Table>
      <tbody>
        <BookmarkFolder bookmark={this.props.bookmarks[0]} level={0} onClickBookmark={this.props.onClickBookmark}/>
      </tbody>
    </Table>
    );
  }
}

export default BookmarkTree;