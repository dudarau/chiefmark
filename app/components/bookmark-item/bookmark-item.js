import React, {Fragment} from 'react';

class BookmarkTree extends React.Component {
  render() {
    return (
      <Fragment>
        <td>
          <span>
            {this.props.identation}
            {this.props.bookmark.title}
          </span>
        </td>
        <td>{(new Date(this.props.bookmark.dateAdded)).toDateString()}</td>
        <td>
          {Object.keys(this.props.bookmark).join(' ')}
        </td>
      </Fragment>);
  }
}

export default BookmarkTree;