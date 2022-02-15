import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'components/Spinner';
import SubTitle from 'components/SubTitle';
import CastList from 'components/CastList';
import { getCredits } from 'apiService/movieAPI';
import notification from 'helpers/notification';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const { PENDING, RESOLVED, REJECTED } = Status;
    setStatus(PENDING);
    getCredits(movieId)
      .then(data => {
        if (!data.cast.length) {
          setStatus(REJECTED);
        } else {
          setCast(data.cast);
          setStatus(RESOLVED);
        }
      })
      .catch(error => {
        setStatus(REJECTED);
        notification('error', `${error}`);
      });
  }, [movieId]);

  return (
    <>
      {status === 'pending' && <Spinner />}
      {status === 'rejected' && (
        <SubTitle>We don't have casts list for this movie!</SubTitle>
      )}
      {status === 'resolved' && <CastList cast={cast} />}
    </>
  );
};

export default Cast;
