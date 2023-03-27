import * as Yup from 'yup';

export const signupValidationSchema = () =>
    Yup.object().shape({
        username: Yup.string().required().min(3).max(20),
        password: Yup.string().required().min(6),
        passwordConfirm: Yup.string()
            .required()
            .min(6)
            .oneOf([Yup.ref('password')]),
    });
