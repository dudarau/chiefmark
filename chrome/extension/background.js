import { ATTR_PREFIX, composeTitle } from '../../app/services/filters';
import { updateBookmark } from '../../app/services/bookmarks';

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  updateBookmark(bookmark.id, {
    title: composeTitle(bookmark.title, [], Date.now()),
    url: bookmark.url,
  });
});

chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
  if (changeInfo.title && !changeInfo.title.includes(ATTR_PREFIX)) {
    chrome.bookmarks.get(id, bookmarks => {
      bookmarks.forEach(item => {
        updateBookmark(item.id, {
          title: composeTitle(item.title, [], Date.now()),
          url: item.url,
        });
      });
    });
  }
});
