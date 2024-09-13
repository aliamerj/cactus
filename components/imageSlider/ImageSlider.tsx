"use client"
import { useState } from 'react'
import Image from 'next/image'

export const ImageSlider = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (<div className="lg:w-1/2">
    {/* Main Image */}
    <div className="relative">
      <Image
        src={selectedImage}
        alt="Product"
        width={400}
        height={400}
        className="rounded-lg object-cover w-full h-[400px] lg:h-[500px] shadow-md"
      />
    </div>

    {/* Vertical Thumbnails */}
    <div className="flex items-center gap-2 mt-5 space-x-4 lg:space-x-0">
      {images.map((image, index) => (
        <div
          key={index}
          className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer ${selectedImage === image ? "border-blue-500" : "border-gray-300"
            }`}
          onClick={() => setSelectedImage(image)}
        >
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={`Thumbnail ${index + 1}`}
          />
        </div>
      ))}
    </div>
  </div>
  )
}
