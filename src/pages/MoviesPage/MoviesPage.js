import { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import Spinner from 'components/Spinner';
import MovieCard from 'components/MovieCard';
import NotFound from 'components/NotFound';
import SearchBar from 'components/SearchBar';
import toastify from 'helpers/toastify';
import UpButton from 'components/UpButton';
import { getMovie } from 'apiServices/movieAPI';
import styles from './MoviesPage.module.css';
import { Pagination } from 'react-pagination-bar';
import 'react-pagination-bar/dist/index.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const MoviesPage = () => {
  const history = useHistory();
  const location = useLocation();
  const currentSearchQuery =
    new URLSearchParams(location.search).get('query') ?? '';
  const currentPage = new URLSearchParams(location.search).get('page') ?? 1;
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState(currentSearchQuery);
  const [page, setPage] = useState(currentPage);
  const [totalResults, setTotalResults] = useState(0);
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!searchQuery) return;
    const { PENDING, RESOLVED, NOTFOUND } = Status;
    setStatus(PENDING);
    getMovie(searchQuery, page)
      .then(data => {
        if (!data.results.length) {
          setStatus(NOTFOUND);
          toastify(
            'warning',
            'Sorry, there are no movies matching your search query. Please try again!',
          );
        } else {
          setTotalResults(data.total_results);
          setMovie(data.results);
          setStatus(RESOLVED);
          if (page === 1) toastify('success', 'Search successfully!');
        }
      })
      .catch(error => {
        setStatus(NOTFOUND);
        toastify('error', `${error}`);
      });
  }, [searchQuery, page]);

  const pushToHistory = (query, value) =>
    history.push({
      ...location,
      search: `query=${query}&page=${value}`,
    });

  const handleFormSubmit = query => {
    if (query !== searchQuery) {
      setMovie([]);
      setSearchQuery(query);
      setPage(1);
    }
  };

  const onPageСhange = pageNumber => {
    setPage(pageNumber);
    pushToHistory(searchQuery, pageNumber);
  };

  return (
    <>
      {status === 'pending' && <Spinner />}
      <div className={styles['movie-wrapper']}>
        <SearchBar onSubmit={handleFormSubmit} />
        {status === 'notFound' && <NotFound />}
        {status === 'resolved' && (
          <>
            <ul className={styles['movie-list']}>
              {movie.map(element => (
                <MovieCard key={element.id} element={element} url={url} />
              ))}
            </ul>
            <div
              style={{
                textAlign: 'center',
                width: '800px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Pagination
                initialPage={Number(page)}
                itemsPerPage={20}
                onPageСhange={onPageСhange}
                totalItems={totalResults}
                startLabel={'<<'}
                endLabel={'>>'}
                nextLabel={'>'}
                prevLabel={'<'}
                withGoToInput={true}
                pageNeighbours={2}
                withProgressBar={true}
              />
            </div>
          </>
        )}
      </div>
      <UpButton />
    </>
  );
};

export default MoviesPage;
