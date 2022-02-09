import ScrollUpButton from 'react-scroll-up-button';
import { ImArrowUp } from 'react-icons/im';
import styles from './UpButton.module.css';

const UpButton = () => {
  return (
    <ScrollUpButton
      ContainerClassName={styles['for-container']}
      TransitionClassName={styles['for-transition']}
    >
      <ImArrowUp
        style={{
          width: 20,
          height: 20,
          display: 'block',
        }}
      />
    </ScrollUpButton>
  );
};

export default UpButton;
