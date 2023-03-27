import { toast } from 'react-toastify';

const showNotification = (message, type) => {
  toast[type](message);
};

export default showNotification;
