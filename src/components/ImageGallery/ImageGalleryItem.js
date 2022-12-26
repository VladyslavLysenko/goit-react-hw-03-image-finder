import React from 'react';
import PropTypes from 'prop-types';
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


ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  shereSrcForModal: PropTypes.func.isRequired,
  photo: PropTypes.object
}