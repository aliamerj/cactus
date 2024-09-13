import { databaseDrizzle } from '@/db/database'
import { notFound } from 'next/navigation'
import { format } from "date-fns";
import Link from "next/link"
import { Phone, User, Tag, FileText, Truck, ChevronLeft, Calendar } from "lucide-react";

import { ImageSlider } from '@/components/imageSlider/ImageSlider';

export default async function page({ params }: { params: { id: string } }) {

  const product = await databaseDrizzle.query.posts.findFirst({
    where: (p, o) => o.eq(p.id, params.id),
    with: {
      author: true,
    }
  })
  if (!product) return notFound()

  // Format the createdAt date
  const formattedDate = format(new Date(product.createdAt), "MMMM dd, yyyy")

  return (<div className="container mx-auto px-4 py-8">
    {/* Breadcrumb-like Return to Products Page */}
    <div className="mb-6">
      <Link
        href={"/"}
        className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="text-lg font-medium">Back to Products</span>
      </Link>
    </div>
    {/* Product Card */}
    <div className="bg-white shadow-lg rounded-lg p-6 lg:flex lg:space-x-8">
      {/* Left Column: Image Slider */}

      <ImageSlider images={product.images} />

      {/* Right Column: Product Info */}
      <div className="lg:w-1/2 space-y-6 mt-6 lg:mt-0">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

        {/* Publish Time */}
        <div className="flex items-center text-lg text-gray-600 space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Published on {formattedDate}</span>
        </div>

        {/* Price */}
        <div className="text-3xl font-semibold text-green-600 flex items-center space-x-2">
          <Tag className="h-6 w-6" />
          <span>{product.price} ₽</span>
        </div>

        {/* Seller Info */}
        <div className="space-y-2">
          <div className="flex items-center text-lg text-gray-700">
            <User className="h-5 w-5 mr-2" />
            <span>Seller: {product.author.name}</span>
          </div>
          <div className="flex items-center text-lg text-gray-700">
            <Phone className="h-5 w-5 mr-2" />
            <span>{product.author.phone}</span>
          </div>
        </div>

        {/* Delivery */}
        <div className="flex items-center text-lg text-gray-700 space-x-2 mt-4">
          <Truck className="h-6 w-6" />
          <span>Fast and safe delivery available</span>
        </div>
      </div>
    </div>

    {/* Description Section */}
    <div className="bg-gray-50 mt-8 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <FileText className="h-6 w-6 mr-2" />
        Description
      </h2>
      <p className="text-gray-600">{product.description}</p>
    </div>
  </div>)
}
