import React from 'react';


export function ImageGalleryItem({ photo: { webformatURL, tags,id } }) {
  return (
    <li key={id} className="gallery-item">
      <img src={webformatURL} alt={tags} />
    </li>
  );
}
