import PropTypes from 'prop-types';
import PhotoNotAvailable from 'images/photo-not-available.jpg';
import styles from './CastItem.module.css';

const CastItem = ({ element }) => {
  const { profile_path, name, original_name, character, popularity } = element;

  const normalizedName = name ? name : original_name;

  return (
    <li className={styles['cast-item']}>
      <div className={styles['cast-item-wrapper-img']}>
        <img
          className={styles['cast-item-img']}
          src={
            profile_path
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : PhotoNotAvailable
          }
          alt={normalizedName}
        />
      </div>
      <div className={styles['cast-item-description']}>
        <p className={styles['cast-item-description-title']}>
          {normalizedName}
        </p>
        <p className={styles['cast-item-description-text']}>
          Character: <span>{character}</span>
        </p>
        <p className={styles['cast-item-description-text']}>
          Popularity: <span>{popularity.toFixed(1)}</span>
        </p>
      </div>
    </li>
  );
};

CastItem.propTypes = {
  element: PropTypes.shape({
    profile_path: PropTypes.string,
    name: PropTypes.string,
    original_name: PropTypes.string,
    character: PropTypes.string,
    popularity: PropTypes.number,
  }),
};

export default CastItem;
