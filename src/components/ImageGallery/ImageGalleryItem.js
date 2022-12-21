import React from 'react';

export function ImageGalleryItem({ photo: { webformatURL, tags } }) {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags} />
    </li>
  );
}
