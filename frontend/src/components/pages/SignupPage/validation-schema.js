import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'sequence', function f(funcList) {
  // eslint-disable-next-line
  return this.test(async (value, context) => {
    try {
      // eslint-disable-next-line
      for (const func of funcList) {
        // eslint-disable-next-line
        await func().validate(value);
      }
    } catch ({ message }) {
      return context.createError({ message });
    }
    return true;
  });
});

const signupValidationSchema = () => Yup.object().shape({
  username: Yup.string().min(3, 'min3max20').max(20, 'min3max20').required(),
  password: Yup.string().min(6).required(),
  passwordConfirm: Yup.string().sequence([
    () => Yup.string().required(),
    () => Yup.string().oneOf([Yup.ref('password')]),
    () => Yup.string().min(6),
  ]),
});

export default signupValidationSchema;
