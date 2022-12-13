import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(6, 'minimum 6'),
    password: Yup.string().min(6, 'Minimum 6 characters required').required('Pass'),
});
