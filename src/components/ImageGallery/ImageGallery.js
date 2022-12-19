import { Component } from "react";

export class ImageGallery extends Component {
    
    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.photoName;
        const nextName = this.props.photoName;
    if (prevName !== nextName) {
        console.log('Змінився пошуковий запит');
         fetch(
           `https://pixabay.com/api/?q=${nextName}&page=1&key=30662426-21982097d0559eebc608a0eec&image_type=photo&orientation=horizontal&per_page=12`
         ).then(res=> res.json()).then(console.log);
        }
        
}

    render() {
        return (
          <ul className="gallery">
            <li className="gallery-item">
              <img src="" alt="" />
            </li>
          </ul>
        );
    }
}