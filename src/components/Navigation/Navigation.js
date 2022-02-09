import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles['navigation-list']}>
        <li className={styles['navigation-item']}>
          <NavLink
            exact
            to="/"
            className={styles['navigation-link']}
            activeClassName={styles['navigation-link-active']}
          >
            HOME
          </NavLink>
        </li>
        <li className={styles['navigation-item']}>
          <NavLink
            to="/movies"
            className={styles['navigation-link']}
            activeClassName={styles['navigation-link-active']}
          >
            MOVIE
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
