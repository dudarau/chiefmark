import moment from 'moment';

export const ATTR_PREFIX = '[KM|';
export const TAGS_PREFIX = 'TG:';
export const DATE_LAST_OPENED_PREFIX = 'DLO:';
const ATTR_END = ']';
const ATTR_SEPATOR = '|';

let tagCollection = [];

function isTextFilterValid(title, search) {
  return !search || title.toLowerCase().includes(search.toLowerCase());
}

function isDateFilterValid(_dateAdded, _dateLastOpened, _startDate, _endDate) {
  let dateAdded = moment(_dateAdded);
  let dateLastOpened =
    _dateLastOpened && moment(new Number(_dateLastOpened)).isValid()
      ? moment(new Number(_dateLastOpened))
      : null;
  let startDate =
    _startDate && moment(_startDate).isValid() ? moment(_startDate) : null;
  let endDate =
    _endDate && moment(_endDate).isValid()
      ? moment(_endDate).add(1, 'days')
      : null;

  if (!(startDate || endDate)) {
    return true;
  }

  if (startDate && !endDate) {
    return (
      startDate.isBefore(dateAdded) ||
      (dateLastOpened && startDate.isBefore(dateLastOpened))
    );
  }

  if (!startDate && endDate) {
    return (
      dateAdded.isBefore(endDate) &&
      (!dateLastOpened || dateLastOpened.isBefore(endDate))
    );
  }

  return (
    dateAdded.isBetween(startDate, endDate) &&
    (!dateLastOpened || dateLastOpened.isBetween(startDate, endDate))
  );
}

function isTagFilterValid(tags, filterTags) {
  return (
    filterTags.length === 0 ||
    (tags.length > 0 && tags.find(tag => filterTags.includes(tag)))
  );
}

function applyFilter(bookmark, filters) {
  if (
    isTextFilterValid(bookmark.title, filters.search) &&
    isDateFilterValid(
      bookmark.dateAdded,
      bookmark.dateLastOpened,
      filters.startDate,
      filters.endDate
    ) &&
    isTagFilterValid(bookmark.tags, filters.tags)
  ) {
    return bookmark;
  }

  return null;
}

function filterBookmark(bookmark, filters) {
  if (!bookmark.children) {
    return applyFilter(bookmark, filters);
  }

  const children = bookmark.children
    .map(mark => {
      return filterBookmark(mark, filters);
    })
    .filter(mark => !!mark);

  if (children.length > 0) {
    return {
      ...bookmark,
      children,
    };
  }

  return null;
}

function saveTags(tags) {
  tags.forEach(tag => {
    if (tag && !tagCollection.includes(tag)) {
      tagCollection.push(tag);
    }
  });
}

export function getTagList() {
  return tagCollection;
}

function getAttribute(arr, prefix) {
  const attr = arr.find(item => item.indexOf(prefix) === 0);
  return attr ? attr.replace(prefix, '') : '';
}

export function processAttributes(title) {
  const startIndex =
    title && typeof title === 'string'
      ? title.indexOf(ATTR_PREFIX) + ATTR_PREFIX.length
      : -1;
  const endIndex =
    title && typeof title === 'string'
      ? title.indexOf(ATTR_END, startIndex)
      : -1;
  let attributes = [];
  let tags = [];
  let dateLastOpened;
  let newTitle = title;
  if (startIndex > 0 && endIndex > 0) {
    attributes = title
      .substr(startIndex, endIndex - startIndex)
      .split(ATTR_SEPATOR);
    dateLastOpened = getAttribute(attributes, DATE_LAST_OPENED_PREFIX);
    tags = getAttribute(attributes, TAGS_PREFIX).split(',');
    newTitle = title.substr(0, startIndex - ATTR_PREFIX.length);
    saveTags(tags);
  }
  return {
    title: newTitle,
    tags: tags,
    dateLastOpened,
  };
}

export function composeTitle(title, tags, dateLastOpened) {
  return `${title}${ATTR_PREFIX}${TAGS_PREFIX}${tags.join(',')}${ATTR_SEPATOR}${DATE_LAST_OPENED_PREFIX}${dateLastOpened}${ATTR_END}`;
}

export function processBookmark(bookmark) {
  if (!bookmark) {
    return bookmark;
  }
  return {
    ...bookmark,
    ...processAttributes(bookmark.title),
    children: bookmark.children
      ? bookmark.children.map(mark => processBookmark(mark))
      : null,
  };
}

export function isFiltersEmpty(filters) {
  return !(
    filters.search ||
    filters.startDate ||
    filters.endDate ||
    (filters.tags && filters.tags.length)
  );
}

export function applyFilters(bookmark, filters) {
  if (isFiltersEmpty(filters)) {
    return bookmark;
  }

  return filterBookmark(bookmark, filters);
}
