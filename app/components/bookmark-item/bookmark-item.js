import React from 'react';
import { Table } from 'reactstrap';

class BookmarkTree extends React.Component {
  render() {
    return (<div>
      Item : {this.props.bookmark.title}
    </div>);
  }
}

export default BookmarkTree;