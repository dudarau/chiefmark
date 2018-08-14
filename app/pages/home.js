import React from 'react';
// import logo from '../react.svg';

import { getBookmarksTree } from '../services/bookmarks'

import BookmarkGrid from '../components/bookmark-list/bookmark-list';

import './home.css';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bookmarks: []
    };
  }

  componentDidMount() {
    getBookmarksTree().then(nodes => {
      console.log(nodes);
      this.setState({
        bookmarks: nodes,
      });
    })
  }

  render() {
    if (!this.state) return null;

    return (
      <div className="Home">
        <div className="Home-header">
          {/*<img src={logo} className="Home-logo" alt="logo" />*/}
          <h2>Welcome to Chiefmark</h2>
        </div>
        <BookmarkGrid bookmarks={this.state.bookmarks}/>
      </div>
    );
  }
}

export default Home;