import { getProducts } from '@/app/lib/dummyapi';
import { ProductResponse } from '@/app/lib/api-definitions';
import ProductCard from './product-card';

export default async function ProductsGrid({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const productResponse: ProductResponse = await getProducts();

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
      {productResponse.products?.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );

}