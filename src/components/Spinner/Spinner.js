import { Circles } from 'react-loader-spinner';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <Circles
      color="#18819e"
      height={100}
      width={100}
      wrapperClass={styles['spinner-wrapper']}
    />
  );
};

export default Spinner;
