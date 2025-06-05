import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import ProductsGrid from '@/app/ui/products/grid';

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
      <div>
          <ProductsGrid query={query} currentPage={currentPage} />
      </div>
    </div>
  );
} 