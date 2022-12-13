import Spinner from 'react-bootstrap/Spinner';
import { SpinnerContainer } from './spinner.styled';

export const AppSpinner = () => {
    return (
        <SpinnerContainer>
            <Spinner />
        </SpinnerContainer>
    );
};
