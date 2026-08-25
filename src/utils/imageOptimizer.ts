/**
 * Utility helper to optimize image URLs for WebP compression, responsive dimensions,
 * and high Lighthouse mobile performance scores.
 */
export function getOptimizedImageUrl(
  url: string | undefined | null,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'auto';
  }
): string {
  if (!url) {
    return 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=75&fm=webp';
  }

  const { width = 600, height, quality = 75, format = 'webp' } = options || {};

  // If it is an Unsplash image, enforce WebP format (fm=webp) and optimal dimensions/quality
  if (url.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fm', format);
      parsed.searchParams.set('q', quality.toString());
      if (width) parsed.searchParams.set('w', width.toString());
      if (height) parsed.searchParams.set('h', height.toString());
      parsed.searchParams.set('fit', 'crop');
      return parsed.toString();
    } catch {
      // Return modified string if URL parsing fails
      if (url.includes('?')) {
        return `${url}&fm=${format}&q=${quality}`;
      }
      return `${url}?auto=format&fm=${format}&w=${width}&q=${quality}&fit=crop`;
    }
  }

  // If it is a local .jpg image in assets, provide the .webp alternative if available
  if (url.endsWith('.jpg')) {
    return url.replace(/\.jpg$/, '.webp');
  }

  return url;
}
