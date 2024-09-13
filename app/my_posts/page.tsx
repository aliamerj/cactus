import { auth } from "@/auth"
import { databaseDrizzle } from "@/db/database";
import { redirect } from 'next/navigation'
import { Trash2, Edit3, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { PostDialog } from "@/components/postDialog/PostDialog";
import { deletePost } from "@/actions/delete-post";
import { revalidatePath } from "next/cache";
export default async function page() {
  const session = await auth();

  if (!session?.user?.id) return redirect("/login");

  const products = await databaseDrizzle.query.posts.findMany({
    where: (p, o) => o.eq(p.author, session.user?.id!)
  })


  return (
    <div className="lg:px-32 md:px-20 sm:px-10  p-4">
      <h1 className="text-2xl font-extrabold mb-6">My Products</h1>
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>)
}

const ProductCard = ({ product }: { product: any }) => {
  const timeAgo = formatDistanceToNow(new Date(product.createdAt), { addSuffix: true });

  return (
    <div className="flex justify-between items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">

      {/* Product Image */}
      <Link href={`product/${product.id}`} className="flex items-center space-x-4">
        <div className="relative h-24 w-32">
          <Image
            fill
            className="absolute h-full w-full object-cover rounded-lg"
            src={product.images[0]}
            alt={product.title}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
          <p className="text-gray-600">Price: {product.price} ₽</p>

          {/* Time Ago (Creation Time) */}
          <div className="flex items-center space-x-1 text-gray-500 text-sm mt-1">
            <Clock className="h-4 w-4" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </Link>

      {/* Edit and Delete Buttons */}
      <div className="flex flex-col gap-5 items-center">
        <PostDialog post={product}>
          <Button variant='secondary' >
            <Edit3 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </PostDialog>
        <form action={async () => {
          "use server"
          deletePost(product.id);
          revalidatePath('/my_posts')
        }}>
          <Button
            variant="destructive"
            type="submit"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </form>
      </div>
    </div>);
};
