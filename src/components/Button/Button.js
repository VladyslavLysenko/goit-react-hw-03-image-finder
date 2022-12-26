import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';
export const Button = ({ onClick }) => (
  <LoadMoreBtn onClick={onClick}>Load more</LoadMoreBtn>
);

Button.propTypes = { onClick: PropTypes.func.isRequired };
