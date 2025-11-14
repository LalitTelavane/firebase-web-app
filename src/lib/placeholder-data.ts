import type { User, Creator, Reel } from './types';

export const creators: Creator[] = [
  { id: 'creator-1', name: 'Gusto', avatarUrl: 'https://picsum.photos/seed/creator-avatar-1/40/40' },
  { id: 'creator-2', name: 'Bella', avatarUrl: 'https://picsum.photos/seed/creator-avatar-2/40/40' },
  { id: 'creator-3', name: 'Chef Rico', avatarUrl: 'https://picsum.photos/seed/creator-avatar-3/40/40' },
  { id: 'creator-4', name: 'SpicySue', avatarUrl: 'https://picsum.photos/seed/creator-avatar-4/40/40' },
  { id: 'creator-5', name: 'BakeAway', avatarUrl: 'https://picsum.photos/seed/creator-avatar-5/40/40' },
];

export const reels: Reel[] = [
  {
    id: 'reel-1',
    creator: creators[0],
    videoUrl: 'https://picsum.photos/seed/reel-1/450/800',
    description: 'Master the art of fresh homemade pasta. It is easier than you think! 🍝',
    likes: 1204,
    product: { id: 'prod-1', name: 'Pasta Making Kit', price: 29.99, imageUrl: 'https://picsum.photos/seed/reel-1/150/150' },
  },
  {
    id: 'reel-2',
    creator: creators[2],
    videoUrl: 'https://picsum.photos/seed/reel-2/450/800',
    description: 'The perfect sear on a steak every time. Secret revealed! 🔥',
    likes: 8734,
    product: { id: 'prod-2', name: 'Premium Ribeye Steak', price: 45.50, imageUrl: 'https://picsum.photos/seed/reel-2/150/150' },
  },
  {
    id: 'reel-3',
    creator: creators[4],
    videoUrl: 'https://picsum.photos/seed/reel-3/450/800',
    description: 'This decadent chocolate lava cake will blow your mind. 🍫',
    likes: 25301,
    product: { id: 'prod-3', name: 'Lava Cake Mix', price: 12.00, imageUrl: 'https://picsum.photos/seed/reel-3/150/150' },
  },
   {
    id: 'reel-4',
    creator: creators[3],
    videoUrl: 'https://picsum.photos/seed/reel-4/450/800',
    description: 'A summer salad that actually tastes good. You are welcome.',
    likes: 982,
    product: { id: 'prod-4', name: 'Organic Salad Box', price: 18.75, imageUrl: 'https://picsum.photos/seed/reel-4/150/150' },
  },
];

export const users: User[] = [
    {
        id: 'user-1',
        name: 'Alex',
        email: 'alex@email.com',
        avatarUrl: 'https://picsum.photos/seed/user-avatar-1/40/40',
        role: 'user',
    },
    {
        id: 'creator-1',
        name: 'Gusto',
        email: 'gusto@email.com',
        avatarUrl: 'https://picsum.photos/seed/creator-avatar-1/40/40',
        role: 'creator',
    }
];
