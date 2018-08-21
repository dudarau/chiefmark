export function openNewTab(url) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    tabs => {
      let index = tabs[0].index;
      chrome.tabs.create({ url, index: index + 1 });
    }
  );
}
