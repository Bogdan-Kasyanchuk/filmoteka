import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './AddInfoNavigation.module.css';

import { useLocation } from 'react-router-dom';

const AddInfoNavigation = ({ url }) => {
  const location = useLocation();
  return (
    <>
      <h2 className={styles['movie-details-add-inform-title']}>
        Additional information:
      </h2>
      <ul className={styles['movie-details-add-inform-list']}>
        <li className={styles['movie-details-add-inform-item']}>
          <NavLink
            className={styles['movie-details-add-inform-link']}
            activeClassName={styles['movie-details-add-inform-link-active']}
            to={{
              pathname: `${url}/cast`,
              state: { from: location },
            }}
          >
            Cast
          </NavLink>
        </li>
        <li className={styles['movie-details-add-inform-item']}>
          <NavLink
            className={styles['movie-details-add-inform-link']}
            activeClassName={styles['movie-details-add-inform-link-active']}
            to={{
              pathname: `${url}/reviews`,
              state: { from: location },
            }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </>
  );
};

AddInfoNavigation.propTypes = {
  url: PropTypes.string.isRequired,
};

export default AddInfoNavigation;
