import React from 'react';
import logo from '../react.svg';

import { getBookmarks } from '../services/bookmarks'

import BookmarkGrid from '../components/bookmark-list/bookmark-list';

import './home.css';

class Home extends React.Component {
  render() {
    const bookmarks = getBookmarks();
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle + Koa</h2>
        </div>
        <BookmarkGrid bookmarks={bookmarks}/>
      </div>
    );
  }
}

export default Home;