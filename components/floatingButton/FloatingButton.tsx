import { Button } from "@/components/ui/button"
import { BadgePlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PostForm } from "../postForm/PostForm"

export const FloatingButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="icon"
          className="fixed bottom-10 right-10 w-20 h-20 transform transition-all duration-300 ease-in-out hover:scale-110"
        >
          <BadgePlus className="w-16 h-16" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
          <DialogDescription>
            Create a new post by filling out the form below
          </DialogDescription>
        </DialogHeader>
        <PostForm />
      </DialogContent>
    </Dialog>

  )
}
