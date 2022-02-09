import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'components/Spinner';
import ReviewsItem from 'components/ReviewsItem';
import Button from 'components/Button';
import { getReviews } from 'apiService/movieAPI';
import { scrollBottom, scrollPosition } from 'helpers/scrollBottom';
import notification from 'helpers/notification';
import styles from './Reviews.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      const { PENDING, RESOLVED, REJECTED } = Status;
      setStatus(PENDING);
      await getReviews(movieId, page)
        .then(data => {
          if (!data.results.length) {
            setStatus(REJECTED);
            notification(
              'warning',
              "We don't have any reviews for this movie!",
            );
          } else {
            setTotalPages(data.total_pages);
            setReviews(reviews => [...reviews, ...data.results]);
            setStatus(RESOLVED);
            if (page === 1)
              notification('success', 'Reviews uploaded successfully!');
          }
        })
        .catch(error => {
          setStatus(REJECTED);
          notification('error', `${error}`);
        });
      if (page >= 2) scrollBottom();
    }
    fetchReviews();
  }, [movieId, page]);

  const handlerClick = () => {
    scrollPosition();
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {status === 'pending' && <Spinner />}
      {status === 'rejected' && (
        <p className={styles['reviews-title']}>
          We don't have any reviews for this movie!
        </p>
      )}
      {status === 'resolved' && (
        <ul className={styles['reviews-list']}>
          {reviews.map(element => (
            <ReviewsItem key={element.id} element={element} />
          ))}
        </ul>
      )}
      {page < totalPages && (
        <Button
          name={'Load more'}
          nameClass="load-button"
          onClick={handlerClick}
        />
      )}
    </>
  );
};

export default Reviews;
