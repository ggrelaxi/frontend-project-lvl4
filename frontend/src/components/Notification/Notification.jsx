import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notification = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            theme="light"
        />
    );
};
