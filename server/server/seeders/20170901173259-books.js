module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Books', [
      {
        bookTitle: 'THE PEOPLE IN THE TREE',
        author: 'Y. Hayan',
        category: 'Adventure',
        isbn: '345798465',
        stocknumber: '2',
        image: 'l1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: 'Lorem Ipronic typesetting, remaininised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      },
      {
        bookTitle: 'THE LATE PARADE',
        author: 'F. Adam',
        category: 'Adventure',
        isbn: '234560878',
        stocknumber: '0',
        image: 'l2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: 'It is a long established fact thaorem Ipsu uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)',
      },
      {
        bookTitle: 'I AM THE WOLF',
        author: 'L. Mark',
        category: 'Music',
        isbn: '4678980976',
        stocknumber: '5',
        image: 'l3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: 'There are many variations of passages of Lorem Ipsum available, but the majority orem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',

      },
      {
        bookTitle: 'THE PALE NORTH',
        author: 'H. Clayton',
        category: 'Adventure',
        isbn: '34567887655',
        stocknumber: '3',
        image: 'l4.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from ',
      },
      {
        bookTitle: 'ADULTOLESENCE',
        author: 'G. Hannah',
        category: 'Romance',
        isbn: '45678974567',
        stocknumber: '10',
        image: 'l5.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urum.'
      },
      {
        bookTitle: 'WHAT IT MEANS WHEN A MAN FALL FROM SKY',
        author: 'L. Nneka',
        category: 'Adventure',
        isbn: '567244567',
        stocknumber: '10',
        image: 'l6.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium?'
      },
      {
        bookTitle: 'THE SONG AND THE SILENCE',
        author: 'Y. Johnson',
        category: 'Music',
        isbn: '64578974567',
        stocknumber: '10',
        image: 'l7.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: 'But I must explain to you how all this mists no resultant pleasure  ducimus qui blanditiis praesentium voluptatum culpa qui officia ?'
      },
      {
        bookTitle: 'THE ILIAD HOMMER',
        author: 'P. Green',
        category: 'Action',
        isbn: '787890974567',
        stocknumber: '8',
        image: 'l8.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: 'At vero eos et accusamus et iuse delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
      },

    ], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Books', null, {}),
};
