import { Component } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    photoName: '',
  };

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
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleNameChange}
            value={this.state.photoName}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

  SearchBar.propTypes = {
    onSubmit: PropTypes.func,
  };