import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import Logo from 'components/Logo';

const Navigation = () => {
  return (
    <div className={styles.navigation}>
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
        <li>
          <Logo children="MOVIE LIBRARY" />
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
    </div>
  );
};

export default Navigation;
