import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MovieCard from 'components/MovieCard';
import toastify from 'helpers/toastify';
import Spinner from 'components/Spinner';
import UpButton from 'components/UpButton';
import { getTrending } from 'apiServices/movieAPI';
import styles from './HomePage.module.css';
import { Pagination } from 'react-pagination-bar';
import 'react-pagination-bar/dist/index.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const HomePage = () => {
  const history = useHistory();
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get('page') ?? 1;
  const [movieTrending, setMovieTrending] = useState([]);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const { PENDING, RESOLVED, NOTFOUND } = Status;
    setStatus(PENDING);
    getTrending(page)
      .then(data => {
        if (!data.results.length) {
          setStatus(NOTFOUND);
          toastify('warning', 'Sorry, there are no trending movies!');
        } else {
          setTotalResults(data.total_results);
          setMovieTrending(data.results);
          setStatus(RESOLVED);
          if (page === 1)
            toastify('success', 'Trending movies uploaded successfully!');
        }
      })
      .catch(error => {
        setStatus(NOTFOUND);
        toastify('error', `${error}`);
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
          <div className={styles['home-wrapper']}>
            <h1 className={styles['home-title']}>Trending today</h1>
            <ul className={styles['home-list']}>
              {movieTrending.map(element => (
                <MovieCard key={element.id} element={element} url="movies" />
              ))}
            </ul>
          </div>
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
      <UpButton />
    </>
  );
};

export default HomePage;
