import './UpButton.css';
import ScrollUpButton from 'react-scroll-up-button';
import { ImArrowUp } from 'react-icons/im';

const UpButton = () => {
  return (
    <ScrollUpButton
      ContainerClassName="AnyClassForContainer"
      TransitionClassName="AnyClassForTransition"
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
