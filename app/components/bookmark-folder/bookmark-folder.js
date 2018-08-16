import React from 'react';
import BookmarkItem from '../bookmark-item/bookmark-item';

class BookmarkFolder extends React.Component {
  render() {
    const {bookmark} = this.props;

    if (!bookmark) return null;

    if (bookmark.children) {
      return (<div>
        <div>
          Folder: {bookmark.title}
        </div>
        {bookmark.children.map((item, index) => (<BookmarkFolder key={index} bookmark={item}/>))}
      </div>
      );
    }

    return (<BookmarkItem bookmark={bookmark} />);
  }
}

export default BookmarkFolder;