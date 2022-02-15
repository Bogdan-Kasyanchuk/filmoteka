import { Circles } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <Circles
      width={100}
      height={100}
      color="#18819e"
      wrapperStyle={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        margin: '-50px 0 0 -50px',
        zIndex: 1200,
      }}
    />
  );
};

export default Spinner;
