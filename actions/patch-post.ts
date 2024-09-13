"use server";

import { auth } from "@/auth";
import { updatePost } from "@/schema/post";
import path from "path";
import { promises as fs } from "fs"
import { databaseDrizzle } from "@/db/database";
import { posts } from "@/db/schemas/posts";
import { and, eq } from "drizzle-orm";


export async function patchPost(formData: FormData, postId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("forbidden");

  const images = formData.getAll("images") as File[];
  const currentImg = formData.getAll("current_images") as string[];

  const uploadedImagePaths: string[] = [...currentImg];

  const values = {
    title: formData.get("title"),
    description: formData.get("description"),
    images: uploadedImagePaths,
    price: parseInt(formData.get("price") as string ?? "")
  }

  const validatedData = updatePost.safeParse(values);

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

  validatedData.data.images =  uploadedImagePaths;

  await databaseDrizzle
    .update(posts)
    .set({ author: session.user.id, ...validatedData.data })
    .where(and(eq(posts.id, postId), eq(posts.author, session.user.id)));
}
