import imgNotFound from 'images/not-found.jpg';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles['not-found']}>
      <img
        className={styles['not-found-img']}
        src={imgNotFound}
        alt="Not found"
      />
    </div>
  );
};

export default NotFound;
