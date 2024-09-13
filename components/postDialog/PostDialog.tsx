import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PostForm } from "../postForm/PostForm"
import { posts } from "@/db/schemas/posts"

export const PostDialog = ({ children, post }: { children: React.ReactNode, post?: typeof posts.$inferSelect }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
          <DialogDescription>
            Create a new post by filling out the form below
          </DialogDescription>
        </DialogHeader>
        <PostForm post={post}/>
      </DialogContent>
    </Dialog>

  )
}
