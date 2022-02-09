import Logo from 'components/Logo';
import Navigation from 'components/Navigation';
import styles from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={styles.header}>
      <Logo children="MOVIE LIBRARY" />
      <Navigation />
    </header>
  );
};

export default AppBar;
