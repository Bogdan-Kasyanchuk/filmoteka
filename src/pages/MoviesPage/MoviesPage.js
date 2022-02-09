import { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import Spinner from 'components/Spinner';
import SearchBar from 'components/SearchBar';
import NotFound from 'components/NotFound';
import MovieCard from 'components/MovieCard';
import CustomPagination from 'components/CustomPagination';
import { getMovie } from 'apiService/movieAPI';
import notification from 'helpers/notification';
import styles from './MoviesPage.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const MoviesPage = () => {
  const location = useLocation();
  const currentSearchQuery =
    new URLSearchParams(location.search).get('query') ?? '';
  const currentPage = new URLSearchParams(location.search).get('page') ?? 1;
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState(currentSearchQuery);
  const [page, setPage] = useState(currentPage);
  const [totalResults, setTotalResults] = useState(0);
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!searchQuery) return;
    const { PENDING, RESOLVED, REJECTED } = Status;
    setStatus(PENDING);
    getMovie(searchQuery, page)
      .then(data => {
        if (!data.results.length) {
          setStatus(REJECTED);
          notification(
            'warning',
            'Sorry, there are no movies matching your search query. Please try again!',
          );
        } else {
          setTotalResults(data.total_results);
          setMovie(data.results);
          setStatus(RESOLVED);
          if (page === 1) notification('success', 'Search successfully!');
        }
      })
      .catch(error => {
        setStatus(REJECTED);
        notification('error', `${error}`);
      });
  }, [searchQuery, page]);

  const pushToHistory = (query, value) =>
    history.push({
      ...location,
      search: `query=${query}&page=${value}`,
    });

  const handlerFormSubmit = query => {
    if (query !== searchQuery) {
      setMovie([]);
      setSearchQuery(query);
      setPage(1);
    } else {
      notification('warning', 'Enter the different name of the movie!');
    }
  };

  const onPageСhange = pageNumber => {
    setPage(pageNumber);
    pushToHistory(searchQuery, pageNumber);
  };

  return (
    <>
      {status === 'pending' && <Spinner />}
      <div className={styles['movie']}>
        <SearchBar onSubmit={handlerFormSubmit} />
        {status === 'rejected' && <NotFound />}
        {status === 'resolved' && (
          <>
            <ul className={styles['movie-list']}>
              {movie.map(element => (
                <MovieCard key={element.id} element={element} url={url} />
              ))}
            </ul>
            <CustomPagination
              page={page}
              totalResults={totalResults}
              onPageСhange={onPageСhange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MoviesPage;
