"use client";
import * as z from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { newPost } from "@/schema/post";
import { useRef, useState, useTransition } from "react";
import { ImageIcon, X } from "lucide-react"; // Icons for image and remove action
import { useRouter } from "next/navigation";
import CurrencyInput from 'react-currency-input-field';
import Image from 'next/image'
import { DialogClose } from "@radix-ui/react-dialog";
import { posts } from "@/db/schemas/posts";
import { handleCreatePost, handleUpdatePost } from "./requestsHandle/requestsHandle";

export const PostForm = ({ post }: { post?: typeof posts.$inferSelect }) => {
  const [images, setImages] = useState<File[]>([]);
  const [currentImages, setCurrentImages] = useState<string[] | undefined>(post?.images);
  const ref = useRef<HTMLButtonElement>(null)
  const [isPending, startTransition] = useTransition();
  const route = useRouter();
  const form = useForm<z.infer<typeof newPost>>({
    resolver: zodResolver(newPost),
    defaultValues: post ?? {
      title: "",
      description: "",
      images: []

    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<z.infer<typeof newPost>>) => {
    const files = Array.from(e.target.files || []);
    field.onChange(files); // Update the form with the file objects

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [file, ...prevImages]);
      }
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number, field: ControllerRenderProps) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      field.onChange(updatedImages);
      return updatedImages;
    });
  };

  const removeCurrentImage = (imageUrl: string) => {
    setCurrentImages((prev) => prev?.filter(url => url != imageUrl));
  };

  async function onSubmit(values: z.infer<typeof newPost>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    images.forEach((image) => formData.append("images", image));
    currentImages?.forEach((url) => formData.append("current_images", url))

    startTransition(async () => {

      const res = post ? await handleUpdatePost(formData, post.id) : await handleCreatePost(formData);
      if (res) {
        ref.current?.click();
        route.refresh();
        return;
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="grid gap-1.5">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={isPending} className="w-full" placeholder="Enter your post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="grid gap-1.5">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <div className="relative">
                  {/* Currency input component */}
                  <CurrencyInput
                    name="price"
                    value={field.value ?? "0"}
                    id="price-input"
                    placeholder="Enter your price"
                    decimalsLimit={2} // Allows 2 decimal places
                    onValueChange={(value) => field.onChange(parseInt(value ?? "0"))}
                    className="w-full pl-4  py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    suffix=" ₽" // Russian ruble currency
                    disableAbbreviations={true}
                    disabled={isPending}

                  />
                  <span className="absolute right-2 top-2 text-gray-400 text-lg"> ₽</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid gap-1.5">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={isPending} placeholder="Enter the description" className="w-full h-32" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="grid gap-1.5">
              <FormLabel>Images</FormLabel>
              <FormControl >
                <div>
                  <div className="border border-dashed border-gray-400 p-6 rounded-lg text-center hover:border-gray-600 transition">
                    <label htmlFor="images" className="flex flex-col items-center cursor-pointer">
                      <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                      <span className="text-gray-500">Drag & drop or click to upload images</span>
                      <input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={isPending}
                        className="hidden"
                        onChange={(e) => handleImageChange(e, { ...field })}
                      />
                    </label>
                  </div>
                  <div >

                    {/* Image Previews */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      {currentImages?.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image}
                            alt={`Preview ${index + 1}`}
                            width={200}
                            height={200}
                            className="h-32 w-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            onClick={() => removeCurrentImage(image)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            width={32}
                            height={32}
                            className="h-32 w-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            onClick={() => removeImage(index, { ...field })}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {!post ? "Submit Post" : "Update Post"}
          </Button>
        </div>
        <DialogClose asChild>
          <button type="button" className="hidden" ref={ref} />
        </DialogClose>
      </form>
    </Form>
  );
};
