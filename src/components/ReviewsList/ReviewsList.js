import PropTypes from 'prop-types';
import ReviewsItem from 'components/ReviewsItem';

const ReviewsList = ({ reviews }) => {
  return (
    <ul>
      {reviews.map(element => (
        <ReviewsItem key={element.id} element={element} />
      ))}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default ReviewsList;
