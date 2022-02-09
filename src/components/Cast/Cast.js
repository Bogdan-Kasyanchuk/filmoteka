import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'components/Spinner';
import CastItem from 'components/CastItem';
import { getCredits } from 'apiService/movieAPI';
import notification from 'helpers/notification';
import styles from './Cast.module.css';

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
          notification('warning', "We don't have casts list for this movie!");
        } else {
          setCast(data.cast);
          setStatus(RESOLVED);
          notification('success', 'Casts list uploaded successfully!');
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
        <p className={styles['cast-title']}>
          We don't have casts list for this movie!
        </p>
      )}
      {status === 'resolved' && (
        <ul className={styles['cast-list']}>
          {cast.map(element => (
            <CastItem key={element.id} element={element} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
