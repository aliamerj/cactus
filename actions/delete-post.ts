"use server";

import { auth } from "@/auth";
import { databaseDrizzle } from "@/db/database";
import { posts } from "@/db/schemas/posts";
import { and, eq } from "drizzle-orm";


export async function deletePost(postId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("forbidden");

  await databaseDrizzle
    .delete(posts)
    .where(and(eq(posts.id, postId), eq(posts.author, session.user.id)));
}
