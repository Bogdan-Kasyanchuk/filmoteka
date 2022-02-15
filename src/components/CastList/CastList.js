import PropTypes from 'prop-types';
import CastItem from 'components/CastItem';
import styles from './CastList.module.css';

const CastList = ({ cast }) => {
  return (
    <ul className={styles['cast-list']}>
      {cast.map(element => (
        <CastItem key={element.id} element={element} />
      ))}
    </ul>
  );
};

CastList.propTypes = {
  cast: PropTypes.array.isRequired,
};

export default CastList;
