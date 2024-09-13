import { z } from "zod";
export const MB = 1024 * 1024; // 1Mb

export const newPost = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(100, "Title must be under 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be under 500 characters"),
  price: z.number().positive(),
  images: z.array(
    z.any()
      .refine(
        (file) => {
          return (
            file ||
            (file instanceof File && file.type.substring(0, 5) === "image")
          );
        },
        {
          message: "Invalid image",
        },
      )
      .refine((file) => file || (file instanceof File && file.size < MB), {
        message: "image is too large. Maximum size is 1 MB",
      })).nonempty(),

});

export const updatePost = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(100, "Title must be under 100 characters").optional(),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be under 500 characters"),
  price: z.number().positive().optional(),
  images: z.array(
    z.any()
      .refine(
        (file) => {
          return (
            file ||
            (file instanceof File && file.type.substring(0, 5) === "image")
          );
        },
        {
          message: "Invalid image",
        },
      )
      .refine((file) => file || (file instanceof File && file.size < MB), {
        message: "image is too large. Maximum size is 1 MB",
      })).optional(),

});
