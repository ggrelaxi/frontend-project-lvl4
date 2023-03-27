import * as Yup from 'yup';

const loginValidationSchema = () => Yup.object().shape({
  username: Yup.string().required().min(4),
  password: Yup.string().required().min(4),
});

export default loginValidationSchema;
