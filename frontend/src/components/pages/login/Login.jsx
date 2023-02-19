import { Button, Form, Alert } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LoginContainer } from './login.styled';
import { loginValidationSchema } from './validation-schema';
import { AuthContext } from '../../../context';
import { services } from '../../../api';
import { AppSpinner } from '../../common/appSpinner';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState(false);
    const navigate = useNavigate();
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
            services
                .login(username, password)
                .then(({ data: { token } }) => {
                    login(token);
                    return navigate('/');
                })
                .catch((e) => {
                    console.log(e);
                    setAuthError(true);
                })
                .finally(() => setIsLoading(false));
        },
    });
    return (
        <>
            <LoginContainer>
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            isInvalid={'username' in errors}
                            value={values.username}
                            type="text"
                            name="username"
                            placeholder="Enter your name"
                            onChange={handleChange}
                        />
                        <Form.Text className="text-muted">Well never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            isInvalid={'password' in errors}
                            value={values.password}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {authError && (
                        <Alert variant="danger" onClose={() => setAuthError(false)} dismissible>
                            <p>Ошибка авторизации</p>
                        </Alert>
                    )}

                    <Button variant="primary" type="submit" disabled={!isValid}>
                        Submit
                    </Button>
                </form>
            </LoginContainer>

            {isLoading && <AppSpinner />}
        </>
    );
};

export default Login;
