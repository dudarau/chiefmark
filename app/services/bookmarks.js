// import bookmarks from './bookmarks.json';

import faker from "faker";

// Table data as an array of objects
const list = new Array(100).fill(true).map(() => ({
  name: faker.name.findName(),
  description: faker.name.jobTitle(),
  location: faker.address.city()
}));

export function getBookmarksTree() {
  return new Promise(resolve => chrome.bookmarks.getTree(items => resolve(items)));
}

export function getBookmark(id) {
  return chrome.bookmarks.get(id);
}

export function searchBookmarks(query) {
  return chrome.bookmarks.search(query);
}

export function createBookmark(bookmark) {
  return chrome.bookmarks.create(bookmark);
}

export function deleteBookmark(id) {
  return chrome.bookmarks.remove(id);
}

export function updateBookmark(id, changes) {
  return chrome.bookmarks.update(id, changes);
}