import imgNotFound from 'images/not-found.jpg';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <img className={styles['not-found']} src={imgNotFound} alt="Not found" />
  );
};

export default NotFound;
