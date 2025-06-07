import { getFilteredProducts, productsPerPage } from '@/app/lib/dummyapi';
import { ProductResponse } from '@/app/lib/api-definitions';
import ProductCard from './product-card';
import Pagination from '@/app/ui/invoices/pagination';

export default async function ProductsGrid({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const {products, total}: ProductResponse = await getFilteredProducts(query, currentPage);
  const totalPages = Math.ceil(total / productsPerPage);
  return (
    <>
      {(query != '') && (
        <p className="mt-4">
          You have searched for &apos;{query}&apos;, found {total} {total == 1 ? 'product' : 'products'}
        </p>
      )}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {products?.map((product) => <ProductCard product={product} key={product.id} />)}
      </div>
      {total > 0 && (<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>)}
    </>
  );

}