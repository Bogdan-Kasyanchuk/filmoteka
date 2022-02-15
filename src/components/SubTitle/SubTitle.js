import PropTypes from 'prop-types';
import styles from './SubTitle.module.css';

const SubTitle = ({ children, nameClass }) => {
  return (
    <h3 className={`${styles.subtitle} ${styles[nameClass]}`}>{children}</h3>
  );
};

SubTitle.propTypes = {
  children: PropTypes.node,
  nameClass: PropTypes.string,
};

export default SubTitle;
