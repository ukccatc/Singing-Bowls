export interface Product {
  id: string;
  name: {
    en: string;
    ru: string;
  };
  description: {
    en: string;
    ru: string;
  };
  price: number;
  category: 'bowls' | 'bells' | 'accessories';
  image_url: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  name: {
    en: string;
    ru: string;
  };
  description: {
    en: string;
    ru: string;
  };
  price: number;
  category: string;
  image_url: string;
  stock: number;
}
