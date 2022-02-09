import PropTypes from 'prop-types';
import PhotoNotAvailable from 'images/photo-not-available.jpg';
import styles from './ReviewsItem.module.css';

const ReviewsItem = ({ element }) => {
  const {
    author_details: { avatar_path },
    author,
    content,
  } = element;

  return (
    <li className={styles['reviews-item']}>
      <div className={styles['reviews-item-wrapper']}>
        <div className={styles['reviews-item-wrapper-img']}>
          <img
            className={styles['reviews-item-img']}
            src={
              !avatar_path
                ? PhotoNotAvailable
                : (avatar_path.includes('/https:') && avatar_path.slice(1)) ||
                  `https://secure.gravatar.com/avatar${avatar_path}`
            }
            alt={author}
          />
        </div>
        <p className={styles['reviews-item-title']}> {author}</p>
      </div>
      <p className={styles['reviews-item-text']}> {content}</p>
    </li>
  );
};

ReviewsItem.propTypes = {
  element: PropTypes.shape({
    author_details: PropTypes.shape({
      avatar_path: PropTypes.string,
    }),
    author: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default ReviewsItem;
