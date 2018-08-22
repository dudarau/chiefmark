import { composeTitle } from '../../app/services/filters';
import { updateBookmark } from '../../app/services/bookmarks';

chrome.bookmarks.onCreated.addListener(id => {
  chrome.bookmarks.get(id, bookmarks => {
    bookmarks.forEach(item => {
      updateBookmark(item.id, {
        title: composeTitle(item.title, [], Date.now()),
      });
    });
  });
});
