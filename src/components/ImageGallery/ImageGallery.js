import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import toast from 'react-hot-toast';
// idle - простой,pending-ожидаєтся,resolve-выполнилось, reject-отклонено
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
    page: 1,
    showLoadMore: false,
    perPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.photoName;
    const nextName = this.props.photoName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      this.setState({photos:[]})

      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=30662426-21982097d0559eebc608a0eec&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(photos => {
          console.log(photos.totalHits);
          const { perPage, page } = this.state;
          const pages = Math.ceil(photos.totalHits / perPage);
          const showLoadMore = page < pages;
          this.setState({ showLoadMore });

          if (photos.hits.length === 0) {
            toast.error('Sorry,we did not find...');
            this.setState({ status: Status.IDLE });
          } else {
            this.setState({
              photos: [...prevState.photos, ...photos.hits],
              status: Status.RESOLVED,
            });
          }
        })
        .catch(() => {
          this.setState({ status: Status.REJECTED });
          toast.error('Ups... Something is wrong.', {
            duration: 4000,
            position: 'top-center',
          });
        });
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
  loadMore = () => {
    this.setState(prev => ({
      page: (prev.page += 1),
    }));
    console.log(this.state.page);
  };
  render() {
    const { status, showLoadMore } = this.state;
    const { onImgClick, shereSrcForModal } = this.props;

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
            {this.state.photos.map(photo => (
              <ImageGalleryItem
                photo={photo}
                key={photo.id}
                onImgClick={onImgClick}
                shereSrcForModal={shereSrcForModal}
              />
            ))}
          </ul>
          {showLoadMore && <Button type="button" onClick={this.loadMore} />}
        </div>
      );
    }
  }
}
