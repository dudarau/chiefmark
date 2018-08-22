export function getBookmarksTree() {
  return new Promise(resolve =>
    chrome.bookmarks.getTree(items => resolve(items))
  );
}

export function getBookmark(id) {
  return chrome.bookmarks.get(id);
}

export function searchBookmarks(query) {
  return chrome.bookmarks.search(query);
}

export function createBookmark(bookmark) {
  return new Promise(resolve =>
    chrome.bookmarks.create(bookmark, () => resolve())
  );
}

export function deleteBookmark(id) {
  return new Promise(resolve =>
    chrome.bookmarks.remove(id, () => resolve())
  );
}

export function updateBookmark(id, changes) {
  return new Promise(resolve =>
    chrome.bookmarks.update(id, changes, () => resolve())
  );
}
