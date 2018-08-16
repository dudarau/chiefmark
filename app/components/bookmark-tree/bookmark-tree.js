import React from 'react';
import BookmarkFolder from '../bookmark-folder/bookmark-folder';

class BookmarkTree extends React.Component {
  render() {
    return (<BookmarkFolder bookmark={this.props.bookmarks[0]}/>);
  }
}

export default BookmarkTree;