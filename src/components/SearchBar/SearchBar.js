import PropTypes from 'prop-types';
import { useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { BiBrush } from 'react-icons/bi';
import toastify from 'helpers/toastify';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleClick = () => {
    setSearchQuery('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toastify('warning', 'Enter the name of the movie!');
    } else {
      onSubmit(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <div className={styles['search-wrapper']}>
      <form className={styles['search-form']} onSubmit={handleSubmit}>
        <button className={styles['search-form-button']} type="submit">
          <CgSearch style={{ width: 28, height: 28, display: 'block' }} />
        </button>
        <input
          className={styles['search-form-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleChange}
        />
        <button
          className={styles['search-form-button']}
          type="button"
          onClick={handleClick}
        >
          <BiBrush style={{ width: 28, height: 28, display: 'block' }} />
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
