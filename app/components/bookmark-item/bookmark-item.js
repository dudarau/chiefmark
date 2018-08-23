import React, { Fragment } from 'react';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BookmarkTree extends React.Component {
  onEditClick = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onEditClick(this.props.bookmark);
  };

  render() {
    const { bookmark, identation, onClick } = this.props;
    return (
      <Fragment>
        <td onClick={() => {
          onClick(bookmark);
        }} className="title-column">
          <span>
            {identation}
            {bookmark.title}
          </span>
        </td>
        <td>{new Date(bookmark.dateAdded).toDateString()}</td>
        <td>{new Date(new Number(bookmark.dateLastOpened)).toDateString()}</td>
        <td>
          {bookmark.tags.map((tag, index) => (
            <Badge color="primary" key={index} pill>
              {tag}
            </Badge>
          ))}
        </td>
        <td onClick={this.onEditClick}>
          <FontAwesomeIcon icon="edit" />
        </td>
      </Fragment>
    );
  }
}

export default BookmarkTree;
