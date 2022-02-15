import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <ul className={styles['navigation-list']}>
        <li className={styles['navigation-item']}>
          <NavLink
            exact
            to="/"
            className={styles['navigation-link']}
            activeClassName={styles['navigation-link-active']}
          >
            Home
          </NavLink>
        </li>
        <li className={styles['navigation-item']}>
          <NavLink
            to="/movies"
            className={styles['navigation-link']}
            activeClassName={styles['navigation-link-active']}
          >
            Movie
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
