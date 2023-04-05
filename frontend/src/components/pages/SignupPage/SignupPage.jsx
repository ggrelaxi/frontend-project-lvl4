import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RegistrationContainer from './signup.styled';
import signupValidationSchema from './validation-schema';
import { AuthContext } from '../../../context';
import { AuthServices } from '../../../api';
import Spinner from '../../common/Spinner/Spinner';
import showNotification from '../../Notification/notification-emmiter';
import { ERROR_NOTIFICATION } from '../../Notification/notification-type';
import urls from '../../../urls';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmitHandler = (formValues) => {
    setIsLoading(true);
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
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 position-relative" controlId="inputUsername">
              <Form.Label>{t('signupPage.userName')}</Form.Label>
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
                  {typeof errors.username !== 'string'
                    ? t(errors.username.transKey, {
                      minValue: errors.username.min,
                      maxValue: errors.username.max,
                    })
                    : t(`validation.${errors.username}`)}
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputPassword">
              <Form.Label>{t('signupPage.password')}</Form.Label>
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
                  {typeof errors.password !== 'string'
                    ? t(errors.password.transKey, { minValue: errors.password.min })
                    : t(`validation.${errors.password}`)}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="inputConfirm">
              <Form.Label>{t('signupPage.passwordConfirm')}</Form.Label>
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
                  {typeof errors.passwordConfirm !== 'string'
                    ? t(errors.passwordConfirm.transKey, {
                      minValue: errors.passwordConfirm.min,
                    })
                    : t(`validation.${errors.passwordConfirm}`)}
                </div>
              ) : null}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
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

export default SignupPage;
