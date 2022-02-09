import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Spinner from 'components/Spinner';
import MovieCard from 'components/MovieCard';
import CustomPagination from 'components/CustomPagination';
import { getTrendingMovies } from 'apiService/movieAPI';
import notification from 'helpers/notification';
import styles from './HomePage.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const HomePage = () => {
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get('page') ?? 1;
  const [movieTrending, setMovieTrending] = useState([]);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [totalResults, setTotalResults] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const { PENDING, RESOLVED, REJECTED } = Status;
    setStatus(PENDING);
    getTrendingMovies(page)
      .then(data => {
        if (!data.results.length) {
          setStatus(REJECTED);
          notification('warning', 'Sorry, there are no trending movies!');
        } else {
          setTotalResults(data.total_results);
          setMovieTrending(data.results);
          setStatus(RESOLVED);
          if (page === 1)
            notification('success', 'Trending movies uploaded successfully!');
        }
      })
      .catch(error => {
        setStatus(REJECTED);
        notification('error', `${error}`);
      });
  }, [page]);

  const pushToHistory = value =>
    history.push({ ...location, search: `page=${value}` });

  const onPageСhange = pageNumber => {
    setPage(pageNumber);
    pushToHistory(pageNumber);
  };

  return (
    <>
      {status === 'pending' && <Spinner />}
      {status === 'resolved' && (
        <>
          <div className={styles['home']}>
            <h1 className={styles['home-title']}>Trending today</h1>
            <ul className={styles['home-list']}>
              {movieTrending.map(element => (
                <MovieCard key={element.id} element={element} url="movies" />
              ))}
            </ul>
          </div>
          <CustomPagination
            page={page}
            totalResults={totalResults}
            onPageСhange={onPageСhange}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
