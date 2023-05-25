export interface Item {
  id: string;
  name: string;
  price: number;
  type: string[];
  variants: ItemVariant[];
  description: string;
}
export interface ItemVariant {
  variant: string;
  isAvailable: {
    [key: string]: boolean;
  };
  photos: string[];
  reviews: ItemReviews[];
}
export interface ItemReviews {
  id: string;
  first_name: string;
  last_name: string;
  rating: number;
  description: string;
  isVerified: boolean;
  type: string;
  experience: {
    shipping: string;
    product: string;
  };
  photos: string[];
}

export interface Content {
  id: string;
  variant?: string;
  type?: string;
}
export interface ItemContainer {
  content: Content;
  quantity: number;
}
