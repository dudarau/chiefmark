import { applyFilters } from '../filters';

const bookmarks = {
  children: [
    {
      title: 'folder',
      children: [{
        title: 'title 111'
      }, {
        title: 'folder 1',
        children: [
          {
            title: 'title 222'
          }
        ]
      }]
    }
  ]
};

describe('services/filters', () => {
  it('get all if filters are empty', () => {
    expect(applyFilters(bookmarks, { })).toEqual(bookmarks);
  });

  it('filter tree by search-string with valid result', () => {
    expect(applyFilters(bookmarks, { search: '222' })).toEqual({"children": [{"children": [{"children": [{"title": "title 222"}], "title": "folder 1"}], "title": "folder"}]});
  });

  it('filter tree by search-string with empty result', () => {
    expect(applyFilters(bookmarks, { search: '333' })).toEqual(null);
  });
});