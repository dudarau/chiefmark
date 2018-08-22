const events = [
  chrome.bookmarks.onCreated,
  chrome.bookmarks.onRemoved,
  chrome.bookmarks.onChanged,
  chrome.bookmarks.onMoved,
];

let callback;

export function addListener(_callback) {
  callback = _callback;
  events.forEach(event => {
    event.addListener(callback);
  });
}

export function removeListener() {
  events.forEach(event => {
    event.removeListener(callback);
  });
}
