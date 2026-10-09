import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  aspectClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  aspectClassName = 'aspect-[4/3]',
  className = '',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectClassName} bg-gradient-to-br from-[#EFE6D8] via-[#F8F4EC] to-[#E5D8C5] flex flex-col items-center justify-center p-6 text-center border border-[#352820]/10`}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed className="w-7 h-7 text-[#B69A68] mb-2.5 stroke-[1.5]" />
        <span className="font-serif-display text-lg text-[#352820] font-medium">
          {fallbackTitle || alt}
        </span>
        <span className="text-xs text-[#9A6A43] mt-1">Bite of Savour Artisan Patisserie</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`w-full ${aspectClassName} object-cover ${className}`}
      {...rest}
    />
  );
};
