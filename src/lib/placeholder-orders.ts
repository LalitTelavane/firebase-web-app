
import type { Order } from './types';

export const orders: Order[] = [
  {
    id: 'order-1',
    orderDate: '2024-07-15',
    totalAmount: 41.99,
    status: 'Delivered',
    items: [
      {
        id: 'item-1-1',
        name: 'Pasta Making Kit',
        quantity: 1,
        price: 29.99,
        imageUrl: 'https://picsum.photos/seed/reel-1/150/150'
      },
      {
        id: 'item-1-2',
        name: 'Lava Cake Mix',
        quantity: 1,
        price: 12.00,
        imageUrl: 'https://picsum.photos/seed/reel-3/150/150'
      },
    ],
  },
  {
    id: 'order-2',
    orderDate: '2024-07-10',
    totalAmount: 45.50,
    status: 'Delivered',
    items: [
      {
        id: 'item-2-1',
        name: 'Premium Ribeye Steak',
        quantity: 1,
        price: 45.50,
        imageUrl: 'https://picsum.photos/seed/reel-2/150/150'
      },
    ],
  },
    {
    id: 'order-3',
    orderDate: '2024-06-28',
    totalAmount: 18.75,
    status: 'Cancelled',
    items: [
      {
        id: 'item-3-1',
        name: 'Organic Salad Box',
        quantity: 1,
        price: 18.75,
        imageUrl: 'https://picsum.photos/seed/reel-4/150/150'
      },
    ],
  },
    {
    id: 'order-4',
    orderDate: '2024-07-20',
    totalAmount: 54.00,
    status: 'Processing',
    items: [
      {
        id: 'item-4-1',
        name: 'Lava Cake Mix',
        quantity: 2,
        price: 12.00,
        imageUrl: 'https://picsum.photos/seed/reel-3/150/150'
      },
       {
        id: 'item-4-2',
        name: 'Pasta Making Kit',
        quantity: 1,
        price: 29.99,
        imageUrl: 'https://picsum.photos/seed/reel-1/150/150'
      },
    ],
  },
];
