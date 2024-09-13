import { patchPost } from "@/actions/patch-post";
import { savePost } from "@/actions/post-post";
import { toast } from "@/hooks/use-toast";

export const handleCreatePost = async (formData: FormData): Promise<boolean> => {
  try {
    await savePost(formData);
    toast({
      variant: "ok",
      title: "The post has been published successfully",
    });
    return true;

  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message,
    });
  }
  return false
};

export const handleUpdatePost = async (formData: FormData, postId: string): Promise<boolean> => {
  try {
    await patchPost(formData, postId);
    toast({
      variant: "ok",
      title: "The post has been Updated successfully",
    });
    return true;

  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message,
    });
  }
  return false

}
