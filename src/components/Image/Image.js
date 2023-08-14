import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import images from '~/assets/img';

function Image(
  { src, alt, fallback: customFallback = images.noImage, ...props },
  ref,
) {
  const [fallback, setFallback] = useState('');
  const handleError = () => {
    setFallback(customFallback);
  };

  useEffect(() => {
    if (src) {
      setFallback('');
    }
  }, [src])
  
 
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

forwardRef(Image).propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
};

export default forwardRef(Image);
