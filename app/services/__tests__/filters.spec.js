import {
  applyFilters,
  processAttributes,
  getTagList,
  ATTR_PREFIX,
  TAGS_PREFIX,
  DATE_LAST_OPENED_PREFIX, composeTitle
} from '../filters';

const bookmark = {
  children: [
    {
      title: 'folder',
      children: [
        {
          title: 'title 111',
        },
        {
          title: 'folder 1',
          children: [
            {
              title: 'title 222',
            },
          ],
        },
      ],
    },
  ],
};

describe('services/filters', () => {
  it('get all if filters are empty', () => {
    expect(applyFilters(bookmark, {})).toEqual(bookmark);
  });

  it('filter tree by search-string with valid result', () => {
    expect(applyFilters(bookmark, { search: '222', tags: [] })).toEqual({
      children: [
        {
          children: [{ children: [{ title: 'title 222' }], title: 'folder 1' }],
          title: 'folder',
        },
      ],
    });
  });

  it('filter tree by search-string with empty result', () => {
    expect(applyFilters(bookmark, { search: '333' })).toEqual(null);
  });

  it('return empty attributes', () => {
    expect(processAttributes('title')).toEqual({
      dateLastOpened: undefined,
      tags: [],
      title: 'title',
    });
    expect(getTagList().length).toBe(0);
  });

  it('return not empty attributes', () => {
    expect(processAttributes(`title${ATTR_PREFIX}${TAGS_PREFIX}tag1|${DATE_LAST_OPENED_PREFIX}1510242834388]`)).toEqual({
      dateLastOpened: '1510242834388',
      tags: ['tag1'],
      title: 'title',
    });
    expect(getTagList().length).toBe(1);
  });

  it('return not empty attributes and process tag duplication', () => {
    expect(processAttributes(`title${ATTR_PREFIX}${TAGS_PREFIX}tag1,tag1|${DATE_LAST_OPENED_PREFIX}1510242834388]`)).toEqual({
      dateLastOpened: '1510242834388',
      tags: ['tag1', 'tag1'],
      title: 'title',
    });
    expect(getTagList().length).toBe(1);
  });

  it('return composed title', () => {
    const mark = {
      dateLastOpened: '1510242834388',
      tags: ['tag1', 'tag1'],
      title: 'title',
    };
    expect(composeTitle(mark.title, mark.tags, mark.dateLastOpened)).toEqual(`title${ATTR_PREFIX}${TAGS_PREFIX}tag1,tag1|${DATE_LAST_OPENED_PREFIX}1510242834388]`);
  });

  it('return composed title', () => {
    const mark = {
      dateLastOpened: undefined,
      tags: [],
      title: 'title',
    };
    expect(composeTitle(mark.title, mark.tags, mark.dateLastOpened)).toEqual(`title${ATTR_PREFIX}${TAGS_PREFIX}|${DATE_LAST_OPENED_PREFIX}undefined]`);
  });
});
