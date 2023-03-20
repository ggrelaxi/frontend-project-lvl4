import * as Yup from 'yup';

export const signupValidationSchema = Yup.object().shape({
    username: Yup.string().min(3, 'minimum 4').max(20, 'max20').required('Name is required'),
    password: Yup.string().min(6, 'Minimum 4 characters required').required('Pass'),
    passwordConfirm: Yup.string()
        .min(6, 'min6')
        .oneOf([Yup.ref('password'), null])
        .required('required'),
});
