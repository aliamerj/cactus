import { FloatingButton } from "@/components/floatingButton/FloatingButton"
import { Posts } from "@/components/posts/Posts"
import { databaseDrizzle } from "@/db/database"

export default async function Dashboard() {
  const products = await databaseDrizzle.query.posts.findMany();
  return (
    <div >
      <Posts products={products} />
      <FloatingButton />
    </div>
  )
}

