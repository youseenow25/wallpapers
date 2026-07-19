export interface Wallpaper {
  id: number;
  title: string;
  description: string;
  price: number;
  cover_image: string;
  /** JSON array of image paths when the product is a multi-wallpaper pack. */
  images?: string;
  tags: string;
  featured: number;
  type?: string;
  created_at: string;
}

export function packImageCount(w: Wallpaper): number {
  try {
    const arr = JSON.parse(w.images || "[]");
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

export interface CartItem {
  wallpaper: Wallpaper;
  quantity: number;
}
