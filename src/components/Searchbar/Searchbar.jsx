import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmitForm }) => {
  const [name, setName] = useState('');
  // const [pictures, setPictures] = useState([]);

  const handleSubmit = evt => {
    evt.preventDefault();

    if (name.trim() === '') {
      toast.error('Please, enter the word');
      return;
    }
    onSubmitForm(name);
    setName('');
  };

  const handleInputChange = evt => {
    const { value } = evt.currentTarget;
    setName(value.toLowerCase());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <BiSearch style={{ width: 30, height: 30 }} />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={name}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
