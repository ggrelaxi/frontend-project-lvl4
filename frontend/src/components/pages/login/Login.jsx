import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { LoginContainer } from './login.styled';
import { loginValidationSchema } from './validation-schema';

export const Login = () => {
    const { values, handleSubmit, handleChange, errors, isValid } = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: (formValues) => {
            console.log(formValues);
        },
    });

    return (
        <LoginContainer>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        isInvalid={'name' in errors}
                        value={values.name}
                        type="text"
                        name="name"
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

                <Button variant="primary" type="submit" disabled={!isValid}>
                    Submit
                </Button>
            </form>
        </LoginContainer>
    );
};
