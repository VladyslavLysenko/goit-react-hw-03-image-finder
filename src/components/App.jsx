import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import {ImageGallery} from './ImageGallery/ImageGallery'

export class App extends Component {
  state = {
    photoName: '',
  };

  // handleFormSubmit = pokemonName => {
  //   this.setState({ pokemonName });
  // };

  componentDidMount() {
    fetch(
      `https://pixabay.com/api/?q=cat&page=1&key=30662426-21982097d0559eebc608a0eec&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(photo => this.setState({ photo }));
  }

  handleFormSubmit = photoName => {
    this.setState({ photoName });
    console.log(photoName);
  };

  render() {
    return (
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        <Toaster/>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery photoName={ this.state.photoName} />
      </div>
    );
  }
}
