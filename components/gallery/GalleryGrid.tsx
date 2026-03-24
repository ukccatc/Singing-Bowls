'use client';

import { GalleryImage } from '@/lib/data/gallery';
import { Locale } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';
import { GalleryLightbox } from './GalleryLightbox';

interface GalleryGridProps {
  images: GalleryImage[];
  locale: Locale;
}

export function GalleryGrid({ images, locale }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <div className="relative w-full h-64 bg-gray-200">
              <Image
                src={image.thumbnailUrl}
                alt={image.title[locale]}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
              <h3 className="text-white font-semibold text-lg mb-1">
                {image.title[locale]}
              </h3>
              <p className="text-gray-200 text-sm mb-2">
                {image.eventName[locale]}
              </p>
              <p className="text-gray-300 text-xs">
                {new Date(image.eventDate).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'uk-UA')}
              </p>
            </div>

            {/* Category badge */}
            <div className="absolute top-3 right-3 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
              {image.category}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && selectedImage && (
        <GalleryLightbox
          image={selectedImage}
          locale={locale}
          onClose={() => setIsLightboxOpen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          totalImages={images.length}
          currentIndex={images.findIndex(img => img.id === selectedImage.id) + 1}
        />
      )}
    </>
  );
}
