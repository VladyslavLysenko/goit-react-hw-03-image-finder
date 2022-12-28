import { Component } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    photoName: '',
  };

  static propTypes = { onSubmit: PropTypes.func.isRequired };

  handleNameChange = event => {
    this.setState({ photoName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.photoName.trim() === '') {
      toast('Уведіть назву для пошуку фото...');
      return;
    }
    this.props.onSubmit(this.state.photoName);
    this.setState({ photoName: '' });
  };

  render() {
    return (
      <SearchbarHeader className="searchbar">
        <SearchForm onSubmit={this.handleSubmit} className="form">
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleNameChange}
            value={this.state.photoName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

