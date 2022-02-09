import { useState, useEffect, lazy, useRef } from 'react';
import {
  Route,
  useParams,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import NotFound from 'components/NotFound';
import MovieCardDetails from 'components/MovieCardDetails';
import { getMovieDetail } from 'apiService/movieAPI';
import notification from 'helpers/notification';
import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('components/Cast' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('components/Reviews' /* webpackChunkName: "Reviews" */),
);

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const MovieDetailsPage = () => {
  const [movieInform, setMovieInform] = useState({});
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const refLocation = useRef(location);
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { movieId } = useParams();

  useEffect(() => {
    const { PENDING, RESOLVED, REJECTED } = Status;
    setStatus(PENDING);
    getMovieDetail(movieId)
      .then(data => {
        if (Object.keys(data).length === 0) {
          setStatus(REJECTED);
          notification('warning', 'Sorry, no movie details!');
        } else {
          setMovieInform(data);
          setStatus(RESOLVED);
          notification('success', 'Movie details uploaded successfully!');
        }
      })
      .catch(error => {
        setStatus(REJECTED);
        notification('error', `${error}`);
      });
  }, [movieId]);

  const onGoBack = () => {
    if (!refLocation.current.state) return history.push('/movies');
    const getStateFrom = refLocation.current.state.from;
    history.push(
      getStateFrom.search
        ? getStateFrom.pathname + getStateFrom.search
        : getStateFrom.pathname,
    );
  };

  return (
    <>
      {status === 'pending' && <Spinner />}
      <div className={styles['movie-details']}>
        {(status === 'rejected' || status === 'resolved') && (
          <Button name={'Back'} nameClass="back-button" onClick={onGoBack} />
        )}
        {status === 'rejected' && <NotFound />}
        {status === 'resolved' && (
          <>
            <MovieCardDetails movieInform={movieInform} />
            <div className={styles['movie-details-add-inform']}>
              <h3 className={styles['movie-details-add-inform-title']}>
                Additional information:
              </h3>
              <ul className={styles['movie-details-add-inform-list']}>
                <li className={styles['movie-details-add-inform-item']}>
                  <NavLink
                    className={styles['movie-details-add-inform-link']}
                    activeClassName={
                      styles['movie-details-add-inform-link-active']
                    }
                    to={{
                      pathname: `${url}/cast`,
                      state: { from: location },
                    }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={styles['movie-details-add-inform-item']}>
                  <NavLink
                    className={styles['movie-details-add-inform-link']}
                    activeClassName={
                      styles['movie-details-add-inform-link-active']
                    }
                    to={{
                      pathname: `${url}/reviews`,
                      state: { from: location },
                    }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className={styles['movie-details-add-inform-wrapper']}>
              <Route exact path={`${path}/cast`} component={Cast} />
              <Route exact path={`${path}/reviews`} component={Reviews} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MovieDetailsPage;
