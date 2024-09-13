"use server";

import { auth } from "@/auth";
import { newPost } from "@/schema/post";
import path from "path";
import { promises as fs } from "fs"
import { databaseDrizzle } from "@/db/database";
import { posts } from "@/db/schemas/posts";


export async function savePost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("forbidden");

  const images = formData.getAll("images") as File[];
  const uploadedImagePaths: string[] = ["x"];

  const values = {
    title: formData.get("title"),
    description: formData.get("description"),
    images: uploadedImagePaths,
    price: parseInt(formData.get("price") as string ?? "")
  }

  const validatedData = newPost.safeParse(values);
  uploadedImagePaths.pop();

  if (!validatedData.success) throw new Error("Invalid data provided");

  for (const image of images) {
    const buffer = await image.arrayBuffer();
    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(process.cwd(), 'public/_localStorage', fileName);


    // Write the buffer to a file
    await fs.writeFile(filePath, Buffer.from(buffer));

    // Add the file path to the uploadedImagePaths array
    uploadedImagePaths.push(`/_localStorage/${fileName}`);
  }

 validatedData.data.images =  uploadedImagePaths as any;

  await databaseDrizzle.insert(posts).values({ author: session.user.id, ...validatedData.data });
}
