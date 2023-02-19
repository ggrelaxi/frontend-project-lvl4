import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required('Name is required').min(4, 'minimum 4'),
    password: Yup.string().min(4, 'Minimum 4 characters required').required('Pass'),
});
