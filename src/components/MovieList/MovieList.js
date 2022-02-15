import PropTypes from 'prop-types';
import MovieCard from 'components/MovieCard';
import styles from './MovieList.module.css';

const MovieList = ({ movie, url }) => {
  return (
    <ul className={styles['movie-list']}>
      {movie.map(element => (
        <MovieCard key={element.id} element={element} url={url} />
      ))}
    </ul>
  );
};

MovieList.defaultProps = {
  url: 'movies',
};

MovieList.propTypes = {
  movie: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
};

export default MovieList;
