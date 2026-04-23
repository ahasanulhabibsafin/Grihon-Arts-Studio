export interface Graphic {
  id: string;
  title: string;
  category: string;
  previewUrl: string;
  downloadUrl: string;
  price: number;
  description?: string;
  createdAt?: any;
}

export const INITIAL_GRAPHICS: Graphic[] = [
  {
    id: '1',
    title: 'Abstract Harmony',
    category: 'Posters',
    previewUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
    downloadUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    price: 45,
    description: "A deep exploration of geometric balance and earthy tones, perfect for modern minimalist spaces."
  },
  {
    id: '2',
    title: 'Social Fluidity',
    category: 'Social Media',
    previewUrl: 'https://images.unsplash.com/photo-1614850523296-e8c1d4704a96?auto=format&fit=crop&q=80&w=800',
    downloadUrl: 'https://images.unsplash.com/photo-1614850523296-e8c1d4704a96',
    price: 25,
    description: "Vibrant and dynamic compositions designed to elevate digital presence with a touch of organic flow."
  },
  {
    id: '3',
    title: 'Organic Lines',
    category: 'Illustrations',
    previewUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800',
    downloadUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3',
    price: 35,
    description: "Intricate line work inspired by botanical structures and the subtle textures of the natural world."
  },
  {
    id: '4',
    title: 'Earth Tones Vol. 1',
    category: 'Posters',
    previewUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800',
    downloadUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5',
    price: 50,
    description: "A signature piece from the Grihon studio, capturing the essence of raw terrain and warm sunsets."
  }
];
