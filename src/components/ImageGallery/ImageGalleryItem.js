import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryLi, ImageGalleryItemImage } from './ImageGalleryItem.styled';
export function ImageGalleryItem({onImgClick, shereSrcForModal, photo: { webformatURL,largeImageURL, tags } }) {
  return (
    <ImageGalleryLi className="gallery-item">
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => {
          onImgClick();
          shereSrcForModal(largeImageURL, tags);
        }}
      />
    </ImageGalleryLi>
  );
}


ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  shereSrcForModal: PropTypes.func.isRequired,
  photo: PropTypes.object
}