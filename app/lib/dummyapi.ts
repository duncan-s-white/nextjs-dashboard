import { ProductResponse } from "./api-definitions";

const baseUrl = "https://dummyjson.com/";

export async function getProducts(): Promise<ProductResponse> {
  try {
    const products = await fetch(`${baseUrl}products`);
    return await products.json();
  } catch {
    throw new Error("Error retrieving data!");
  }
}
