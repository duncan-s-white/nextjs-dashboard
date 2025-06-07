"use server";

import z from "zod";
import { baseUrl } from "./dummyapi";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Please enter at least 3 characters"),
});

const CreateProduct = FormSchema.omit({'id': true});

export type ValidationState = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
}

export async function PostProduct(prevState: ValidationState, formData: FormData) {
  console.log("starting submit");
  const validatedFields = CreateProduct.safeParse({
    title: formData.get("title")
  });
  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice."
    };
  }
  try {
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields)
    }
    const response = await fetch(`${baseUrl}products/add`, params);
    if (response.status === 201) {
      const product = await response.json();
      console.log(product);
    } else {
      throw new Error();
    }
  } catch {
    return {
      message: "Failed to Create Product."
    };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}


