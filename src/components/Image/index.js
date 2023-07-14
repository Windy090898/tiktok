import React, { forwardRef, useState } from 'react';
import images from '~/assets/img';

function Image(
  { src, alt, fallback: customFallback = images.noImage, ...props },
  ref,
) {
  const [fallback, setFallback] = useState('');
  const handleError = () => {
    setFallback(customFallback);
  };
  return (
    <img
      onError={() => handleError()}
      {...props}
      src={fallback || src}
      alt={alt}
      ref={ref}
    />
  );
}

export default forwardRef(Image);
