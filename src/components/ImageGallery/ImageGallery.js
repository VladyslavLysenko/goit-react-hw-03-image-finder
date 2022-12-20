import { Component } from 'react';
// idle - простой,pending-ожидаєтся,resolve-выполнилось, reject-отклонено
export class ImageGallery extends Component {
  state = {
    photos: [],
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.photoName;
    const nextName = this.props.photoName;
    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
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
        .then(photos => this.setState({ photos: [...prevState.photos, ...photos.hits], status:'resolved' }))
        // .then(console.log)
        .catch(error => this.setState({ error, status: 'rejected' }));
      //  .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { status } = this.state;
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
            
            <li key={photo.id} className="gallery-item">
              <img
                src={photo.webformatURL}
                alt={photo.tags}
              />
            </li>
          ))}
        </ul>
      );
    }
  }
}
