import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDownloadUrl(url: string) {
  if (!url) return '';
  
  // Handle Google Drive links
  // Pattern 1: https://drive.google.com/file/d/FILE_ID/view...
  // Pattern 2: https://drive.google.com/open?id=FILE_ID
  // Pattern 3: https://drive.google.com/uc?id=FILE_ID
  
  let fileId = '';
  
  const dMatch = url.match(/\/d\/(.+?)(\/|$|\?)/);
  const idMatch = url.match(/[?&]id=(.+?)(&|$)/);
  
  if (dMatch && dMatch[1]) {
    fileId = dMatch[1];
  } else if (idMatch && idMatch[1]) {
    fileId = idMatch[1];
  }
  
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  
  // Handle Cloudinary direct download if requested via transformations
  if (url.includes('cloudinary.com')) {
    // Add fl_attachment and q_100 to ensure original quality download
    let transformed = url.replace('/upload/', '/upload/fl_attachment,q_100/');
    // Remove auto scaling if present to keep original size
    return transformed.replace(/c_scale,w_\d+,h_\d+\//, '');
  }

  return url;
}
