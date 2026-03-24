'use client';

import { GalleryImage } from '@/lib/data/gallery';
import { Locale } from '@/lib/types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface GalleryLightboxProps {
  image: GalleryImage;
  locale: Locale;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  totalImages: number;
  currentIndex: number;
}

export function GalleryLightbox({
  image,
  locale,
  onClose,
  onNext,
  onPrevious,
  totalImages,
  currentIndex,
}: GalleryLightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>

      {/* Main image container */}
      <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center">
        <Image
          src={image.imageUrl}
          alt={image.title[locale]}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation buttons */}
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-400 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-400 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={40} />
      </button>

      {/* Image info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2">{image.title[locale]}</h2>
          <p className="text-gray-300 mb-3">{image.description[locale]}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Event</p>
              <p className="font-medium">{image.eventName[locale]}</p>
            </div>
            <div>
              <p className="text-gray-400">Location</p>
              <p className="font-medium">{image.location[locale]}</p>
            </div>
            <div>
              <p className="text-gray-400">Date</p>
              <p className="font-medium">
                {new Date(image.eventDate).toLocaleDateString(
                  locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'uk-UA'
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Image</p>
              <p className="font-medium">{currentIndex} / {totalImages}</p>
            </div>
          </div>

          {image.photographer && (
            <p className="text-gray-400 text-xs mt-3">
              © {image.photographer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
