import React from 'react';

export function ImageGalleryItem({onImgClick, shereSrcForModal, photo: { webformatURL,largeImageURL, tags } }) {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags} onClick={() => {
        onImgClick();
        shereSrcForModal(largeImageURL, tags)
      }}  />
    </li>
  );
}
