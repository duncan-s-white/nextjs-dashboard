import { ProductResponse } from "./api-definitions";

export const baseUrl = "https://dummyjson.com/";
export const productsPerPage = 12;

export async function getProducts(): Promise<ProductResponse> {
  try {
    const products = await fetch(`${baseUrl}products`);
    return await products.json();
  } catch {
    throw new Error("Error retrieving data!");
  }
}

export async function getFilteredProducts(query: string, currentPage: number): Promise<ProductResponse> {
  const limit: number = productsPerPage;
  const skip: number = (currentPage - 1) * limit;

  try {
    const queryStr = new URLSearchParams({
      q: query,
      limit: limit.toString(), 
      skip: skip.toString()
    }).toString();
    let url = `${baseUrl}products?${queryStr}`;
    if(query != '') {
      url = `${baseUrl}products/search?${queryStr}`;
    }
    const products = await fetch(url);
    return await products.json();
  } catch {
    throw new Error("Error retrieving data!");
  }
}

export async function getProduct(id: string) {
  try {
    const url = `${baseUrl}products/${id}`;
    const products = await fetch(url);
    const json = await products.json();
    return json;
  } catch {
    throw new Error("Error retrieving data!");
  }
}
