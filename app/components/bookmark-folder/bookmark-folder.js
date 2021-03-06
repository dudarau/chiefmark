import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BookmarkItem from '../bookmark-item/bookmark-item';

import './bookmark-folder.css';

class BookmarkFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isFilterActive,
    };
  }

  componentDidUpdate() {
    if (this.props.isFilterActive && !this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    }
  }

  onClick = event => {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  addIdentation(level) {
    const result = [];
    for (let i = 0; i < level; i++) {
      result.push(<span key={i} className="row-identation" />);
    }
    return <Fragment>{result}</Fragment>;
  }

  render() {
    const { bookmark } = this.props;

    if (!bookmark) return null;

    if (bookmark.children) {
      return (
        <Fragment>
          <tr onClick={this.onClick}>
            <td>
              {this.addIdentation(this.props.level)}
              {this.state.isOpen ? (
                <FontAwesomeIcon icon="folder-open" />
              ) : (
                <FontAwesomeIcon icon="folder" />
              )}
              {` ${bookmark.title}`}
            </td>
            <td />
            <td />
            <td />
            <td />
          </tr>
          {this.state.isOpen &&
            bookmark.children.map((item, index) => (
              <BookmarkFolder
                key={index}
                bookmark={item}
                isFilterActive={this.props.isFilterActive}
                onClickBookmark={this.props.onClickBookmark}
                onEditClick={this.props.onEditClick}
                level={this.props.level + 1}
              />
            ))}
        </Fragment>
      );
    }

    return (
      <tr

      >
        <BookmarkItem
          bookmark={bookmark}
          identation={this.addIdentation(this.props.level + 1)}
          onClick={this.props.onClickBookmark}
          onEditClick={this.props.onEditClick}
        />
      </tr>
    );
  }
}

export default BookmarkFolder;
