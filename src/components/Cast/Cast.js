import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'components/Spinner';
import toastify from 'helpers/toastify';
import CastItem from 'components/CastItem';
import UpButton from 'components/UpButton';
import { getCredits } from 'apiServices/movieAPI';
import styles from './Cast.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const { PENDING, RESOLVED, NOTFOUND } = Status;
    setStatus(PENDING);
    getCredits(movieId)
      .then(data => {
        if (!data.cast.length) {
          setStatus(NOTFOUND);
          toastify('warning', "We don't have any reviews for this movie!");
        } else {
          setCast(data.cast);
          setStatus(RESOLVED);
        }
      })
      .catch(error => {
        setStatus(NOTFOUND);
        toastify('error', `${error}`);
      });
  }, [movieId]);

  return (
    <>
      {status === 'pending' && <Spinner />}
      {status === 'notFound' && (
        <p className={styles['cast-title']}>
          We don't have any reviews for this movie!
        </p>
      )}
      {status === 'resolved' && (
        <ul className={styles['cast-list']}>
          {cast.map(element => (
            <CastItem key={element.id} element={element} />
          ))}
        </ul>
      )}
      <UpButton />
    </>
  );
};

export default Cast;
