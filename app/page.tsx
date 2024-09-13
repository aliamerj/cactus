import { auth } from "@/auth";
import { PostDialog } from "@/components/postDialog/PostDialog";
import { Posts } from "@/components/posts/Posts"
import { Button } from "@/components/ui/button";
import { databaseDrizzle } from "@/db/database"
import { BadgePlus } from "lucide-react";

export default async function Dashboard() {
  const sesstion = await auth();
  const products = await databaseDrizzle.query.posts.findMany();
  return (
    <div >
      <Posts products={products} />
      {sesstion?.user?.id &&
      <PostDialog>
        <Button
          variant="link"
          size="icon"
          className="fixed bottom-10 right-10 w-20 h-20 transform transition-all duration-300 ease-in-out hover:scale-110"
        >
          <BadgePlus className="w-16 h-16" />
        </Button>
      </PostDialog>}
    </div>
  )
}

