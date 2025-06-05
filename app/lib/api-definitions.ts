export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  sku: string;
  rating: number;
  images: string[];
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
