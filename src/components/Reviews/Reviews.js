import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'components/Spinner';
import SubTitle from 'components/SubTitle';
import ReviewsList from 'components/ReviewsList';
import Button from 'components/Button';
import { getReviews } from 'apiService/movieAPI';
import { scrollBottom, getScrollPosition } from 'helpers/scrollBottom';
import notification from 'helpers/notification';

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
          } else {
            setTotalPages(data.total_pages);
            setReviews(reviews => [...reviews, ...data.results]);
            setStatus(RESOLVED);
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
    getScrollPosition();
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {status === 'pending' && <Spinner />}
      {status === 'rejected' && (
        <SubTitle>We don't have any reviews for this movie!</SubTitle>
      )}
      {status === 'resolved' && <ReviewsList reviews={reviews} />}
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
