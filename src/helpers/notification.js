import { Slide, toast } from 'react-toastify';

const notification = (type, nameToastify) =>
  toast(nameToastify, {
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    transition: Slide,
    type: type,
  });

export default notification;
