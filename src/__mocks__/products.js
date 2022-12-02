import { v4 as uuid } from 'uuid';

export const products = [
  {
    id: uuid(),
    createdAt: '02/12/2022',
    description: 'Order Tea / Coffee from the Canteen.',
    media: '/static/images/products/product_1.png',
    title: 'Tea/Coffee',
    worth: '50'
  },
  {
    id: uuid(),
    createdAt: '02/12/2022',
    description: 'Order a Fresh Sandwich from the Canteen.',
    media: '/static/images/products/product_2.png',
    title: 'Sandwich',
    worth: '100'
  },
  {
    id: uuid(),
    createdAt: '02/12/2022',
    description: 'Order a Fresh Burger from the Canteen.',
    media: '/static/images/products/product_3.png',
    title: 'Burger',
    worth: '125'
  },
  {
    id: uuid(),
    createdAt: '02/12/2022',
    description: 'Approve a Due extension for returning books to the library.',
    media: '/static/images/products/product_4.png',
    title: 'Library Due Extension',
    worth: '200'
  },
  {
    id: uuid(),
    createdAt: '02/12/2022',
    description: 'Request a Letter of Recommendation from a professor.',
    media: '/static/images/products/product_5.png',
    title: 'Letter of Recommendation',
    worth: '1000'
  },
  {
    id: uuid(),
    createdAt: '02/12/2022',
    description: 'Request Internship recommendations from a professor.',
    media: '/static/images/products/product_6.png',
    title: 'Internship',
    worth: '5000'
  }
];
