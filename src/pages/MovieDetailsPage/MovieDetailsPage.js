import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import {
  Route,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import NotFound from 'components/NotFound';
import MovieCardDetails from 'components/MovieCardDetails';
import AddInfoNavigation from 'components/AddInfoNavigation';
import { getMovieDetail } from 'apiService/movieAPI';
import notification from 'helpers/notification';

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
      {(status === 'rejected' || status === 'resolved') && (
        <Button name={'Back'} nameClass="back-button" onClick={onGoBack} />
      )}
      {status === 'rejected' && <NotFound />}
      {status === 'resolved' && (
        <>
          <MovieCardDetails movieInform={movieInform} />
          <AddInfoNavigation url={url} />
          <Suspense fallback={<Spinner />}>
            <Route exact path={`${path}/cast`} component={Cast} />
            <Route exact path={`${path}/reviews`} component={Reviews} />
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
