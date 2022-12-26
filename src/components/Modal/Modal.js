import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './Modal.styled';


export class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
    };


  render() {
    const { src, alt, onClose } = this.props;
    console.log(src);
    return (
      <Overlay
        onClick={() => {
                onClose();
                ;
        }}
      >
            <ModalDiv>
                <img src={src} alt={alt}  />
        </ModalDiv>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
