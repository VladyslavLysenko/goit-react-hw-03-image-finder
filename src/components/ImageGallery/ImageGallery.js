import { Component } from 'react';
// idle - простой,pending-ожидаєтся,resolve-выполнилось, reject-отклонено
export class ImageGallery extends Component {
  state = {
    photo: [],
    status: 'Idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.photoName;
    const nextName = this.props.photoName;
    if (prevName !== nextName) {
      console.log('Змінився пошуковий запит');
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=30662426-21982097d0559eebc608a0eec&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(console.log);
    }
  }

  render() {
    if (this.state.status === 'idle') {
      return (
        <div>
          <p>Знайди свої фото</p>
        </div>
      );
    }
    if (this.state.status === 'pending') {
      return (
        <div>
          <p>Шукаємо...</p>
        </div>
      );
    }
    if (this.state.status === 'rejected') {
      return (
        <div>
          <p>Зображення не знайдено...</p>
        </div>
      );
    }
    if (this.state.status === 'resolved') {
      return (
        <ul className="gallery">
          <li className="gallery-item">
            <img src="{this.}" alt="" />
          </li>
        </ul>
      );
    }
  }
}
