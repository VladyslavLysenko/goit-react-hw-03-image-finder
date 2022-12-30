import { Component } from 'react';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';
import { AppDiv } from './App.styled';
import { GlobalStyle } from 'GlobalStyle';
import api from '../Fetch/Fetch';

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
    page: 1,
    perPage: 12,
    status: Status.IDLE,
    showLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const prevName = prevState.photoName;
    const nextName = this.state.photoName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      this.fetchPhotos(nextName, this.state.page);
    }
  }

  fetchPhotos = (nextName, nextPage) => {
    const { perPage, page } = this.state;
    this.setState({ status: Status.PENDING });
    api
      .fetchPhotos(nextName, nextPage, perPage)
      .then(photos => {
        const pages = Math.ceil(photos.totalHits / perPage);
        const showLoadMore = page < pages;
        this.setState({ showLoadMore });

        if (photos.hits.length === 0) {
          toast.error('Sorry,we did not find...');
          this.setState({ status: Status.IDLE });
        } else {
          const photoApiArr = [];
          photos.hits.map(item =>
            photoApiArr.push({
              id: item.id,
              webformatURL: item.webformatURL,
              largeImageURL: item.largeImageURL,
              tags: item.tags,
            })
          );
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photoApiArr],
            status: Status.RESOLVED,
            page: nextPage,
          }));
          this.autoScroll();
          console.log(photoApiArr);
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
    this.setState(prevState => ({ page: prevState.page + 1 }))
  };

  autoScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleFormSubmit = photoName => {
    this.setState({ photoName, photos: [], page: 1 });
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

        {status === Status.RESOLVED && showLoadMore && (
          <Button type="button" onClick={this.loadMore} />
        )}
      </AppDiv>
    );
  }
}
