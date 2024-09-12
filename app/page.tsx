import { FloatingButton } from "@/components/floatingButton/FloatingButton"
import { Navbar } from "@/components/navbar/Navbar"
import { Posts } from "@/components/posts/Posts"
import { databaseDrizzle } from "@/db/database"

export default async function Dashboard() {
  const products = await databaseDrizzle.query.posts.findMany();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <Posts products={products}/>
      <FloatingButton/>
    </div>
  )
}

