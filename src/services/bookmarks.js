import bookmarks from '../bookmarks.json';

import faker from "faker";

// Table data as an array of objects
const list = new Array(100).fill(true).map(() => ({
  name: faker.name.findName(),
  description: faker.name.jobTitle(),
  location: faker.address.city()
}));

export function getBookmarks() {
  return list;
}