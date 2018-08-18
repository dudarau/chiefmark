import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BookmarkItem from '../bookmark-item/bookmark-item';

import './bookmark-folder.css';

class BookmarkFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isOpen: false,
    };
  }

  onClick = (event) => {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  addIdentation(level) {
    const result = [];
    for (let i = 0; i < level; i++) {
      result.push(<span key={i} className="row-identation"></span>);
    }
    return (<Fragment>{result}</Fragment>);
  }

  render() {
    const {bookmark} = this.props;

    if (!bookmark) return null;

    if (bookmark.children) {
      return (
        <Fragment>
          <tr onClick={this.onClick}>
            <td>
              {this.addIdentation(this.props.level)}
              <FontAwesomeIcon icon="folder"/> {bookmark.title}
              {this.state.isOpen ? <FontAwesomeIcon icon="angle-down"/> : <FontAwesomeIcon icon="angle-right"/>}
            </td>
          </tr>
          {this.state.isOpen &&
            bookmark.children.map((item, index) => (<BookmarkFolder key={index} bookmark={item}  onClickBookmark={this.props.onClickBookmark} level={this.props.level + 1}/>))
          }
        </Fragment>
      );
    }

    return (<tr onClick={() => { this.props.onClickBookmark(bookmark) }}>
      <BookmarkItem bookmark={bookmark} identation={this.addIdentation(this.props.level + 1)}/>
    </tr>);
  }
}

export default BookmarkFolder;