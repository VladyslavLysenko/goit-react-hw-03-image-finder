import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { ImageGalleryUl } from './ImageGallery.styled';
import PropTypes from 'prop-types';

// idle - простой,pending-ожидаєтся,resolve-выполнилось, reject-отклонено

export default function ImageGallery({
  photos,
  status,
  onImgClick,
  shereSrcForModal,
}) {
  if (status === 'idle') {
    return (
      <div>
        <p>Знайди свої фото</p>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div>
        <p>Зображення не знайдено...</p>
      </div>
    );
  }

  return (
    <div>
      <ImageGalleryUl className="gallery">
        {photos.map(photo => (
          <ImageGalleryItem
            photo={photo}
            key={photo.id}
            onImgClick={onImgClick}
            shereSrcForModal={shereSrcForModal}
          />
        ))}
      </ImageGalleryUl>
      {status === 'pending' && <Loader />}
    </div>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  onImgClick: PropTypes.func,
  shereSrcForModal: PropTypes.func,
};
