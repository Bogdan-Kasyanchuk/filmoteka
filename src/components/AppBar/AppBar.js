import Logo from 'components/Logo';
import Navigation from 'components/Navigation';
import styles from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={styles.header}>
      <Logo children="Movie library" />
      <Navigation />
    </header>
  );
};

export default AppBar;
