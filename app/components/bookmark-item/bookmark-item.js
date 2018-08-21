import React, { Fragment } from 'react';
import { Badge } from 'reactstrap';

class BookmarkTree extends React.Component {
  render() {
    const { bookmark, identation } = this.props;
    return (
      <Fragment>
        <td className="title-column">
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
        {/*<td>{JSON.stringify(bookmark)}</td>*/}
      </Fragment>
    );
  }
}

export default BookmarkTree;
