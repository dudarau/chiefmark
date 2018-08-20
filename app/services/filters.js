
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

export function isFiltersEmpty(filters) {
  return !(filters.search || filters.startDate || filters.endDate || (filters.tags && filters.tags.length));
}

export function applyFilters(bookmarks, filters) {
  if (isFiltersEmpty(filters)) {
    return bookmarks;
  }

  return filterBookmark(bookmarks, filters);
}