import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    photoName: '',
    showModal: false,
    largeImgData: { src: '', alt: '' },
  };

  handleFormSubmit = photoName => {
    this.setState({ photoName });
    console.log(photoName);
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
    const { photoName, page, showModal, largeImgData } = this.state;
    return (
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        {showModal && (
          <Modal alt={largeImgData.alt} onClose={this.toggleModal} />
        )}
        <Toaster />
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          photoName={photoName}
          page={page}
          onImgClick={this.toggleModal}
          shereSrcForModal={this.shereSrcForModal}
        />
      </div>
    );
  }
}
