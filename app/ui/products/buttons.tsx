import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function ViewProduct({ id }: { id: string }) {
  return(
  <Link
    href={`/dashboard/products/${id}`}
    className="rounded-md border p-2 hover:bg-gray-100"
  ><EyeIcon className="w-5" /></Link>);
}

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}