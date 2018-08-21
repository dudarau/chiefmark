
const ATTR_PREFIX = '[CHFM|';
const ATTR_END = ']';
const ATTR_SEPATOR = '|';

let tagCollection = [];

function applyFilter(bookmark, filters) {
  if (bookmark.title.toLowerCase().includes(filters.search.toLowerCase())) {
    return bookmark;
  }

  return null;
}

function filterBookmark(bookmark, filters) {
  if (!bookmark.children) {
    return applyFilter(bookmark, filters);
  }

  const children = bookmark.children.map(mark => {
    return filterBookmark(mark, filters);
  }).filter(mark => !!mark);

  if (children.length > 0) {
    return {
      ...bookmark,
      children
    }
  }

  return null;
}

function saveTags(tags) {
  tags.forEach(tag => {
    if (!tagCollection.includes(tag)) {
      tagCollection.push(tag);
    }
  });
}

export function getTagList() {
  return tagCollection;
}

export function processAttributes(title) {
  const startIndex = title && typeof title === 'string'? title.indexOf(ATTR_PREFIX) + ATTR_PREFIX.length: -1;
  const endIndex = title && typeof title === 'string' ? title.indexOf(ATTR_END, startIndex): -1;
  let attributes = [];
  let lastOpenedDate;
  let newTitle = title;
  if (startIndex > 0 && endIndex > 0) {
    attributes = title.substr(startIndex, endIndex - startIndex).split(ATTR_SEPATOR);
    lastOpenedDate = attributes.pop();
    newTitle = title.substr(0, startIndex - ATTR_PREFIX.length);
    saveTags(attributes);
  }
  return {
    title: newTitle,
    tags: attributes,
    lastOpenedDate
  };
}

export function processBookmark(bookmark) {
  if (!bookmark) {
    return bookmark;
  }
  return {
    ...bookmark,
    ...processAttributes(bookmark.title),
    children: bookmark.children ? bookmark.children.map(mark => processBookmark(mark)) : null,
  }
}

export function isFiltersEmpty(filters) {
  return !(filters.search || filters.startDate || filters.endDate || (filters.tags && filters.tags.length));
}

export function applyFilters(bookmark, filters) {
  tagCollection = [];
  if (isFiltersEmpty(filters)) {
    return bookmark;
  }

  return filterBookmark(bookmark, filters);
}