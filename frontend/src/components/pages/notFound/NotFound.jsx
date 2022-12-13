import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { NotFoundContainer } from './not-found.styled';

export const NotFound = () => {
    return (
        <NotFoundContainer>
            <div className="notfound">
                <div className="notfound-404">
                    <h1>
                        4<span>0</span>4
                    </h1>
                </div>
                <h2>the page you requested could not found</h2>
                <Link to="/">
                    <Button variant="primary">GO to main</Button>
                </Link>
            </div>
        </NotFoundContainer>
    );
};
