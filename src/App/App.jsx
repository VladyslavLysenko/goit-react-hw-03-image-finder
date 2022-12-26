import { Component } from 'react';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';
import { AppDiv } from './App.styled';
import { GlobalStyle } from 'GlobalStyle';

import toast from 'react-hot-toast';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    photoName: '',
    showModal: false,
    largeImgData: { src: '', alt: '' },
    photos: [],
    page: 0,
    perPage: 12,
    status: Status.IDLE,
    showLoadMore: false,
  };

  fetchPhotos = (nextName, nextPage) => {
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
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos.hits],
            status: Status.RESOLVED,
            page: nextPage,
          }));
          this.autoScroll();
        }
      })

      .catch(() => {
        this.setState({ status: Status.REJECTED });
        toast.error('Ups... Something is wrong.', {
          duration: 4000,
          position: 'top-center',
        });
      });
  };

  loadMore = () => {
    this.fetchPhotos(this.state.photoName, this.state.page + 1);
  };

  autoScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleFormSubmit = photoName => {
    this.setState({ photoName, photos: [] });
    this.fetchPhotos(photoName, 1);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  shereSrcForModal = (srcLarge, altLarge) => {
    this.setState({ largeImgData: { src: srcLarge, alt: altLarge } });
  };

  render() {
    const { showModal, largeImgData, showLoadMore, photos, status } =
      this.state;
    return (
      <AppDiv>
        <GlobalStyle />
        {showModal && (
          <Modal
            src={largeImgData.src}
            alt={largeImgData.alt}
            onClose={this.toggleModal}
          />
        )}
        <Toaster />
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          photos={photos}
          status={status}
          onImgClick={this.toggleModal}
          shereSrcForModal={this.shereSrcForModal}
        />
        {showLoadMore && <Button type="button" onClick={this.loadMore} />}
      </AppDiv>
    );
  }
}
