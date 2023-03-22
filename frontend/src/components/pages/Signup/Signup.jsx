import { Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationContainer } from './signup.styled';
import { signupValidationSchema } from './validation-schema';
import { AuthContext } from '../../../context';
import { AuthServices } from '../../../api';
import { AppSpinner } from '../../common/AppSpinner';
import { useTranslation } from 'react-i18next';

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstSubmit, setIsFirstSubmit] = useState(true);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const onSubmitHandler = (formValues) => {
        setIsLoading(true);
        setIsFirstSubmit(false);
        const { username, password } = formValues;
        AuthServices.signup(username, password)
            .then(({ data: { token } }) => {
                login(token);
                return navigate('/');
            })
            .catch(() => {
                alert('Пользователь уже существеут');
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <RegistrationContainer>
            <h1>{t('signupPage.registration')}</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    passwordConfirm: '',
                }}
                validationSchema={signupValidationSchema}
                onSubmit={onSubmitHandler}
                validateOnChange={!isFirstSubmit}
                validateOnBlur={!isFirstSubmit}
            >
                {({ values, errors, handleChange, handleSubmit, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 position-relative">
                            <Form.Label>{t('signupPage.userName')}</Form.Label>
                            <Form.Control
                                isInvalid={'username' in errors}
                                value={values.username}
                                type="text"
                                name="username"
                                placeholder={t('signupPage.userNamePlaceholder')}
                                onChange={handleChange}
                            />
                            {errors.username && touched.username && (
                                <Alert className="py-1 my-2" variant="danger">
                                    {errors.username}
                                </Alert>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('signupPage.password')}</Form.Label>
                            <Form.Control
                                isInvalid={'password' in errors}
                                value={values.password}
                                type="password"
                                placeholder={t('signupPage.passwordPlaceholder')}
                                name="password"
                                onChange={handleChange}
                            />
                            {errors.password && touched.password && (
                                <Alert className="py-1 my-2" variant="danger">
                                    {errors.password}
                                </Alert>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>{t('signupPage.passwordConfirm')}</Form.Label>
                            <Form.Control
                                isInvalid={'passwordConfirm' in errors}
                                value={values.passwordConfirm}
                                type="password"
                                placeholder={t('signupPage.passwordConfirmPlaceholder')}
                                name="passwordConfirm"
                                onChange={handleChange}
                            />
                            {errors.passwordConfirm && touched.passwordConfirm && (
                                <Alert className="py-1 my-2" variant="danger">
                                    {errors.passwordConfirm}
                                </Alert>
                            )}
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={() => setIsFirstSubmit(false)}
                            disabled={isLoading}
                        >
                            {t('signupPage.submitButton')}
                        </Button>
                    </form>
                )}
            </Formik>
            {isLoading && <AppSpinner />}
        </RegistrationContainer>
    );
};

export default Signup;
