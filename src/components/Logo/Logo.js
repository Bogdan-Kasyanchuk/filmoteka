import PropTypes from 'prop-types';
import { BiCameraMovie } from 'react-icons/bi';
import styles from './Logo.module.css';

const Logo = ({ children }) => {
  return (
    <div className={styles.logo}>
      <BiCameraMovie
        style={{
          width: 30,
          height: 30,
          // display: 'block',
        }}
      />
      <span className={styles['logo-text']}>{children}</span>
    </div>
  );
};

Logo.propTypes = {
  children: PropTypes.node,
};

export default Logo;
