import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import toast from 'react-hot-toast';
// idle - простой,pending-ожидаєтся,resolve-выполнилось, reject-отклонено
// компонент еррор

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    photos: [],
    status: Status.IDLE,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.photoName;
    const nextName = this.props.photoName;
    // const { page } = this.props;
    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      console.log('Змінився пошуковий запит');
      console.log(nextName);
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=30662426-21982097d0559eebc608a0eec&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(photos => {
          if (photos.hits.length === 0) {
            toast.error('Sorry,we did not find...');
          } else {
            this.setState({
              photos: [...prevState.photos, ...photos.hits],
              status: Status.RESOLVED,
            })
              .catch(() => {
              this.setState({ status: Status.REJECTED });
              toast.error('Ups... Something is wrong.', {
                duration: 4000,
                position: 'top-center',
              });
            });
          }
        })
        // .then(console.log)
      //  .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { status } = this.state;
    // const { photoName } = this.props;
    if (status === 'idle') {
      return (
        <div>
          <p>Знайди свої фото</p>
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div>
          <p>Шукаємо...</p>
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
    if (status === 'resolved') {
      return (
        <ul className="gallery">
          {this.state.photos.map(photo => (
            <ImageGalleryItem photo={photo} />
          ))}
        </ul>
      );
    }
  }
}
