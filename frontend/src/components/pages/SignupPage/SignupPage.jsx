import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RegistrationContainer } from './signup.styled';
import { signupValidationSchema } from './validation-schema';
import { AuthContext } from '../../../context';
import { AuthServices } from '../../../api';
import { Spinner } from '../../common/Spinner/Spinner';
import { showNotification } from '../../Notification/notification-emmiter';
import { ERROR_NOTIFICATION } from '../../Notification/notification-type';
import { urls } from '../../../urls';

export const SignupPage = () => {
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
            .then(({ data: token }) => {
                login(token, username);
                return navigate(urls.mainPage());
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    showNotification(t('notifications.userAlreadySignup'), ERROR_NOTIFICATION);
                } else {
                    showNotification(t('notifications.commonError'), ERROR_NOTIFICATION);
                }
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
                {({ values, errors, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 position-relative" controlId="inputUsername">
                            <Form.Label htmlFor="inputUsername">{t('signupPage.userName')}</Form.Label>
                            <Form.Control
                                isInvalid={'username' in errors}
                                value={values.username}
                                type="text"
                                name="username"
                                placeholder={t('signupPage.userNamePlaceholder')}
                                onChange={handleChange}
                            />
                            {errors.username && (
                                <div className="py-2 text-danger">
                                    {t(errors.username.transKey, {
                                        minValue: errors.username.min,
                                        maxValue: errors.username.max,
                                    })}
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="inputPassword">
                            <Form.Label htmlForm="inputPassword">{t('signupPage.password')}</Form.Label>
                            <Form.Control
                                isInvalid={'password' in errors}
                                value={values.password}
                                type="password"
                                placeholder={t('signupPage.passwordPlaceholder')}
                                name="password"
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <div className="py-2 text-danger">
                                    {t(errors.password.transKey, { minValue: errors.password.min })}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="inputConfirm">
                            <Form.Label htmlFor="inputConfirm">{t('signupPage.passwordConfirm')}</Form.Label>
                            <Form.Control
                                isInvalid={'passwordConfirm' in errors}
                                value={values.passwordConfirm}
                                type="password"
                                placeholder={t('signupPage.passwordConfirmPlaceholder')}
                                name="passwordConfirm"
                                onChange={handleChange}
                            />
                            {errors.passwordConfirm ? (
                                <div className="py-2 text-danger">
                                    {t(errors.passwordConfirm.transKey, { minValue: errors.passwordConfirm.min })}
                                </div>
                            ) : null}
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
            {isLoading && <Spinner />}
        </RegistrationContainer>
    );
};
