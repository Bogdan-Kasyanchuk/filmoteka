import PropTypes from 'prop-types';
import { BiCameraMovie } from 'react-icons/bi';
// import styles from './Navigation.module.css';

const Logo = ({ children }) => {
  return (
    <>
      <BiCameraMovie />
      <span>{children}</span>
    </>
  );
};

Logo.propTypes = {
  children: PropTypes.node,
};

export default Logo;
