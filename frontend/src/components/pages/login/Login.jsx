import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LoginContainer } from './login.styled';
import { loginValidationSchema } from './validation-schema';
import { AuthContext } from '../../../context';
import { AuthServices } from '../../../api';
import { AppSpinner } from '../../common/AppSpinner';
import { showNotification } from '../../Notification/notification-emmiter';
import { ERROR_NOTIFICATION } from '../../Notification/notification-type';

export const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const { login } = useContext(AuthContext);

    const { values, handleSubmit, handleChange, errors, isValid } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: (formValues) => {
            setIsLoading(true);
            const { username, password } = formValues;

            AuthServices.login(username, password)
                .then(({ data: { token } }) => {
                    login(token, username);
                })
                .catch(() => {
                    showNotification(t('notifications.authError'), ERROR_NOTIFICATION);
                })
                .finally(() => setIsLoading(false));
        },
    });

    return (
        <LoginContainer>
            <h1>{t('loginPage.enter')}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 position-relative">
                    <Form.Label>{t('loginPage.userName')}</Form.Label>
                    <Form.Control
                        isInvalid={'username' in errors}
                        value={values.username}
                        type="text"
                        name="username"
                        placeholder={t('loginPage.userNamePlaceholder')}
                        onChange={handleChange}
                    />

                    {errors.username && (
                        <div className="py-2 text-danger">
                            {t(errors.username.transKey, { minValue: errors.username.min })}
                        </div>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{t('loginPage.password')}</Form.Label>
                    <Form.Control
                        isInvalid={'password' in errors}
                        value={values.password}
                        type="password"
                        placeholder={t('loginPage.passwordPlaceholder')}
                        name="password"
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <div className="py-2 text-danger">
                            {t(errors.password.transKey, { minValue: errors.password.min })}
                        </div>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!isValid}>
                    {t('loginPage.submitButton')}
                </Button>
            </Form>
            <div className="mt-5">
                {t('loginPage.noAccount')} <Link to="/signup">{t('loginPage.signup')}</Link>
            </div>
            {isLoading && <AppSpinner />}
        </LoginContainer>
    );
};
