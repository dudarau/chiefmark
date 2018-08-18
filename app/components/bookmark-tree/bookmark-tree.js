import React from 'react';
import { ListGroup } from 'reactstrap';

import BookmarkFolder from '../bookmark-folder/bookmark-folder';

class BookmarkTree extends React.Component {
  render() {
    return (<ListGroup>
      <BookmarkFolder bookmark={this.props.bookmarks[0]} level={0}/>
    </ListGroup>
    );
  }
}

export default BookmarkTree;