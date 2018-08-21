import { applyFilters, processAttributes, getTagList } from '../filters';

const bookmark = {
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
    expect(applyFilters(bookmark, { })).toEqual(bookmark);
  });

  it('filter tree by search-string with valid result', () => {
    expect(applyFilters(bookmark, { search: '222' })).toEqual({"children": [{"children": [{"children": [{"title": "title 222"}], "title": "folder 1"}], "title": "folder"}]});
  });

  it('filter tree by search-string with empty result', () => {
    expect(applyFilters(bookmark, { search: '333' })).toEqual(null);
  });

  it('return empty attributes', () => {
    expect(processAttributes('title')).toEqual({'lastOpenedDate': undefined, 'tags': []});
    expect(getTagList().length).toBe(0);
  });

  it('return not empty attributes', () => {
    expect(processAttributes('title [CHFM|tag1|1510242834388]')).toEqual({'lastOpenedDate': '1510242834388', 'tags': ['tag1']});
    expect(getTagList().length).toBe(1);
  });
});