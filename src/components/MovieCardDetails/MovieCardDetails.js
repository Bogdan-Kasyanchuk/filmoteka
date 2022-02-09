import PropTypes from 'prop-types';
import PosterNotAvailable from '../../images/poster-not-available.jpg';
import styles from './MovieCardDetails.module.css';

const MovieCardDetails = ({ movieInform }) => {
  const {
    poster_path,
    title,
    original_title,
    release_date,
    vote_count,
    vote_average,
    popularity,
    overview,
    genres,
    production_companies,
    production_countries,
  } = movieInform;

  const normalizedTitle = title ? title : original_title;

  return (
    <div className={styles['movie-card-details']}>
      <div className={styles['movie-card-details-wrapper-img']}>
        <img
          className={styles['movie-card-details-img']}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : PosterNotAvailable
          }
          alt={normalizedTitle}
        />
      </div>
      <div className={styles['movie-card-details-description']}>
        <h2 className={styles['movie-card-details-title']}>
          {normalizedTitle} ({release_date.slice(0, 4)})
        </h2>
        <ul className={styles['movie-card-details-list']}>
          <li className={styles['movie-card-details-item']}>
            Vote count: <span>{vote_count}</span>
          </li>
          <li className={styles['movie-card-details-item']}>
            Vote average: <span>{vote_average}</span>
          </li>
          <li className={styles['movie-card-details-item']}>
            Popularity: <span>{popularity.toFixed(1)}</span>
          </li>
        </ul>
        <div className={styles['movie-card-details-overview']}>
          <h3 className={styles['movie-card-details-overview-title']}>
            Overview:
          </h3>
          <p className={styles['movie-card-details-overview-text']}>
            {overview}
          </p>
        </div>
        <div className={styles['movie-card-details-genres']}>
          <h3 className={styles['movie-card-details-genres-title']}>Genres:</h3>
          <ul className={styles['movie-card-details-genres-list']}>
            {genres.map(element => (
              <li
                className={styles['movie-card-details-item']}
                key={element.id}
              >
                {element.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['movie-card-details-companies']}>
          <h3 className={styles['movie-card-details-companies-title']}>
            Production companies:
          </h3>
          <ul className={styles['movie-card-details-companies-list']}>
            {production_companies.map(element => (
              <li
                className={styles['movie-card-details-companies-item']}
                key={element.id}
              >
                {element.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['movie-card-details-countries']}>
          <h3 className={styles['movie-card-details-countries-title']}>
            Production countries:
          </h3>
          <ul className={styles['movie-card-details-countries-list']}>
            {production_countries.map(element => (
              <li
                className={styles['movie-card-details-countries-item']}
                key={element.name}
              >
                {element.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

MovieCardDetails.propTypes = {
  movieInform: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    original_title: PropTypes.string,
    release_date: PropTypes.string,
    vote_count: PropTypes.number,
    vote_average: PropTypes.number,
    popularity: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    production_companies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    production_countries: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }),
};

export default MovieCardDetails;
