

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'user' | 'creator' | 'admin';
};

export type Creator = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}

export type Reel = {
  id: string;
  creator: Creator;
  videoUrl: string; // Placeholder for video, using image URL
  description: string;
  likes: number;
  product: Product;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

export type OrderItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
};

export type Order = {
    id: string;
    orderDate: string;
    totalAmount: number;
    status: 'Delivered' | 'Processing' | 'Cancelled';
    items: OrderItem[];
};
