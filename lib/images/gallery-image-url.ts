/** Build a high-quality URL for gallery grid / lightbox display. */
export function optimizeGalleryImageUrl(
  baseUrl: string,
  width = 1600
): string {
  try {
    const url = new URL(baseUrl.split('?')[0]);

    if (url.hostname === 'images.pexels.com') {
      url.searchParams.set('auto', 'compress');
      url.searchParams.set('cs', 'tinysrgb');
      url.searchParams.set('w', String(width));
      return url.toString();
    }

    if (url.hostname === 'images.unsplash.com') {
      url.searchParams.set('w', String(width));
      url.searchParams.set('q', '90');
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    }
  } catch {
    return baseUrl;
  }

  return baseUrl;
}

function pexels(id: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
}

/** Verified singing-bowl photos for gallery seed / updates. */
export const GALLERY_STOCK_IMAGES = {
  soundBath: pexels(6914829),
  playingBowl: pexels(7113296),
  personHolding: pexels(7970243),
  bowlOutdoor: pexels(5416012),
  bowlCloseUp: pexels(11889659),
  bowlWhite: pexels(10574238),
} as const;
