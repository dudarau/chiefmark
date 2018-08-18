import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListGroupItem } from 'reactstrap';

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
          <ListGroupItem onClick={this.onClick}>
            {this.addIdentation(this.props.level)}
            <FontAwesomeIcon icon="folder"/> {bookmark.title}
            {this.state.isOpen ? <FontAwesomeIcon icon="angle-down"/> : <FontAwesomeIcon icon="angle-right"/>}
          </ListGroupItem>
          {this.state.isOpen &&
            bookmark.children.map((item, index) => (<BookmarkFolder key={index} bookmark={item} level={this.props.level + 1}/>))
          }
        </Fragment>
      );
    }

    return (<ListGroupItem>
      {this.addIdentation(this.props.level)}
      <BookmarkItem bookmark={bookmark} />
    </ListGroupItem>);
  }
}

export default BookmarkFolder;