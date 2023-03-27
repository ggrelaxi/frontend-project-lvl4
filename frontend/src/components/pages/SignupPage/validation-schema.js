import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'sequence', function f(funcList) {
    return this.test(async (value, context) => {
        try {
            for (const func of funcList) {
                await func().validate(value);
            }
        } catch ({ message }) {
            return context.createError({ message });
        }
        return true;
    });
});

export const signupValidationSchema = () =>
    Yup.object().shape({
        username: Yup.string().min(3, 'min3max20').max(20, 'min3max20').required(),
        password: Yup.string().min(6).required(),
        passwordConfirm: Yup.string().sequence([
            () => Yup.string().required(),
            () => Yup.string().oneOf([Yup.ref('password')]),
            () => Yup.string().min(6),
        ]),
    });
