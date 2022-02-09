import PropTypes from 'prop-types';
import { useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { BiBrush } from 'react-icons/bi';
import notification from 'helpers/notification';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handlerChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handlerClick = () => {
    setSearchQuery('');
  };

  const handlerSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      notification('warning', 'Enter the name of the movie!');
      return;
    } else {
      onSubmit(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <form className={styles['search-form']} onSubmit={handlerSubmit}>
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
        onChange={handlerChange}
      />
      <button
        className={styles['search-form-button']}
        type="button"
        onClick={handlerClick}
      >
        <BiBrush style={{ width: 28, height: 28, display: 'block' }} />
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
