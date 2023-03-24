import * as Yup from 'yup';

export const signupValidationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(20).required(),
    password: Yup.string().min(6).required(),
    passwordConfirm: Yup.string()
        .min(6)
        .oneOf([Yup.ref('password')])
        .required(),
});
