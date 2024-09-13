import { posts } from '@/db/schemas/posts'
import { formatDistanceToNow } from "date-fns";
import { Truck, BadgeCheck, Clock } from "lucide-react";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Posts = ({ products }: { products: (typeof posts.$inferSelect)[] }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 lg:px-32 lg:py-20 md:px-20 md:py-10 sm:px-10 sm:py-5">

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>)
}

const ProductCard = ({ product }: { product: typeof posts.$inferSelect }) => {
    // Calculate the time since the product was created
  const timeSincePosted = formatDistanceToNow(new Date(product.createdAt), {
    addSuffix: true,
  });

  return (
     <Link
      href={`product/${product.id}`}
      className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl bg-white flex flex-col transform transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative h-0 pb-[56.25%]">
        <Image
          fill
          className="absolute h-full w-full object-cover"
          src={product.images[0]}
          alt={product.title}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between flex-1">
        {/* Product Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-800">
            {product.title}
          </h3>
          <span className="text-lg md:text-xl font-bold text-green-600">
            {product.price} ₽
          </span>
        </div>

        {/* Time Since Posted */}
        <div className="flex items-center text-gray-600 mb-2 space-x-2">
          <Clock className="h-5 w-5" />
          <span className="text-xs md:text-sm">{timeSincePosted}</span>
        </div>

        {/* Action Icons */}
        <div className="flex justify-between items-center space-x-4 text-gray-600 mt-3">
          {/* Delivery Option */}
          <div className="flex items-center space-x-1">
            <Truck className="h-5 w-5" />
            <span className="text-xs md:text-sm">Delivery Available</span>
          </div>

          {/* Verified Seller */}
          <div className="flex items-center space-x-1">
            <BadgeCheck className="h-5 w-5 text-blue-500" />
            <span className="text-xs md:text-sm">Verified Seller</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
