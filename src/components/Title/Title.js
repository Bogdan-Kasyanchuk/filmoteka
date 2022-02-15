import PropTypes from 'prop-types';
import styles from './Title.module.css';

const Title = ({ children, nameClass }) => {
  return <h2 className={`${styles.title} ${styles[nameClass]}`}>{children}</h2>;
};

Title.propTypes = {
  children: PropTypes.node,
  nameClass: PropTypes.string,
};

export default Title;
