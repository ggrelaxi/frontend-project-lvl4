import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import LoginContainer from './login.styled';
import loginValidationSchema from './validation-schema';
import { AuthContext } from '../../../context';
import showNotification from '../../Notification/notification-emmiter';
import { ERROR_NOTIFICATION } from '../../Notification/notification-type';
import urls from '../../../urls';

const LoginPage = () => {
  const [isLoginError, setIsLoginError] = useState(false);
  const [isLoginErrorMessage, setIsLoginErrorMessage] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    isValid,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (formValues) => {
      const { username, password } = formValues;

      axios.post(urls.login(), {
        username,
        password,
      }).then(({ data: { token } }) => {
        logIn({ token, username });
        setIsLoginError(false);
        setIsLoginErrorMessage('');
        navigate(urls.mainPage());
      }).catch((e) => {
        if (e?.response?.status === 401) {
          setIsLoginErrorMessage(t('notifications.authError'));
        } else {
          showNotification(t('notifications.serverOffline'), ERROR_NOTIFICATION);
          setIsLoginErrorMessage(t('notifications.serverOffline'));
        }
        setIsLoginError(true);
      });
    },
  });

  return (
    <LoginContainer>
      <h1>{t('loginPage.enter')}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 position-relative" controlId="inputUsername">
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
        <Form.Group className="mb-3" controlId="inputPassword">
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
        {isLoginError && <Alert variant="danger">{isLoginErrorMessage}</Alert>}
        <Button variant="primary" type="submit" disabled={!isValid}>
          {t('loginPage.submitButton')}
        </Button>
      </Form>
      <div className="mt-5">
        {t('loginPage.noAccount')}
        &nbsp;
        <Link to={urls.signUpPage()}>{t('loginPage.signup')}</Link>
      </div>
    </LoginContainer>
  );
};

export default LoginPage;
