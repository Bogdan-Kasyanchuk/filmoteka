import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ImFilm } from 'react-icons/im';
import styles from './Logo.module.css';

const Logo = ({ children }) => {
  return (
    <NavLink exact to="/" className={styles.logo}>
      <ImFilm />
      <h1 className={styles['logo-text']}>{children}</h1>
    </NavLink>
  );
};

Logo.propTypes = {
  children: PropTypes.node,
};

export default Logo;
