import React from 'react';

class BookmarkTree extends React.Component {
  render() {
    return (<span>
      {this.props.bookmark.title}
    </span>);
  }
}

export default BookmarkTree;