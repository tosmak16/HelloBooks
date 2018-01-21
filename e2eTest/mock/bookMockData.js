
const image = {
  lastModified: 1508275339000,
  lastModifiedDate: 'Tue Oct 17 2017 22: 22: 19 GMT+0100(WAT)',
  name: '1505168642885l1.jpg',
  size: 127903,
  type: 'image/jpeg',
  webkitRelativePath: ''
};

const bookFile = {
  lastModified: 1507609118000,
  lastModifiedDate: 'Tue Oct 10 2017 05: 18: 38 GMT + 0100(WAT)',
  name: 'Hello-Books - Google Docs.pdf',
  size: 19224,
  type: 'application/pdf',
  webkitRelativePath: ''
};
export const bookMockData =
  {
    id: 1,
    bookId: 1,
    bookTitle: 'THE HOUSE IN THE TREE',
    author: 'Y. Hayan',
    category: 'Adventure',
    isbn: `3445465${Math.floor(Math.random(100) * 100000).toString()}`,
    stockNumber: '2',
    image,
    bookFile,
    summary: 'Lorem Ipronic typesetting, remaininised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    brdate: '2017-10-04T04:55:40.623+01',
    rdate: '2017-10-04T04:55:40.623+01',
  };

export default bookMockData;

