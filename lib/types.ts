export interface Wallpaper {
  id: number;
  title: string;
  description: string;
  price: number;
  cover_image: string;
  tags: string;
  featured: number;
  created_at: string;
}

export interface CartItem {
  wallpaper: Wallpaper;
  quantity: number;
}
