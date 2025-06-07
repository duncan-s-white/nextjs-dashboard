import { Product } from "@/app/lib/api-definitions";
import { getProduct } from "@/app/lib/dummyapi";
import { formatCurrency } from "@/app/lib/utils";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Image from "next/image";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const product: Product = await getProduct(id);
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const product: Product = await getProduct(id);
  const ratingRounded = Math.round(product.rating);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: product.title,
            href: `/dashboard/products/${product.id}`,
            active: true,
          },
        ]}
      />
      <div className="lg:grid lg:grid-cols-2">
        <div className="relative block min-h-64 w-full">
          <Image 
            className="object-cover" 
            src={product.images[0]} 
            alt={`${product.title} product image`} 
            layout="fill" 
            objectFit="contain" 
          />
        </div>
        <div>
          <p className="my-8">{product.description}</p> 
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
            </p>

            <div className="flex items-center">
              {[...Array(ratingRounded)].map((_, i) => (
                <svg key={i} aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>))}
              
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.rating}</span>
            </div>
          </div>
          <p>sku: {product.sku}</p>
        </div>
      </div>
    </main>
  );

}