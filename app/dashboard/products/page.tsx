import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import ProductsGrid from '@/app/ui/products/grid';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { GridSkeleton } from '@/app/ui/skeletons';
import { CreateProduct } from '@/app/ui/products/buttons';

const pageTitle = 'Products';

export const metadata: Metadata = {
  title: pageTitle,
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{pageTitle}</h1>  
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
      <div>       
        <Suspense key={query + currentPage} fallback={<GridSkeleton />}>
          <ProductsGrid query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
} 