import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from '../Loader/Loader';
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
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return (
      <div>
        <p>Зображення не знайдено...</p>
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div>
        <ul className="gallery">
          {photos.map(photo => (
            <ImageGalleryItem
              photo={photo}
              key={photo.id}
              onImgClick={onImgClick}
              shereSrcForModal={shereSrcForModal}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  onImgClick: PropTypes.func,
  shereSrcForModal: PropTypes.func,
};
