import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import NotFoundContainer from './not-found.styled';

const NotFoundPage = () => {
  const { t } = useTranslation();

  // eslint-disable
  return (
    <NotFoundContainer>
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            {
              // eslint-disable-next-line max-len
            }
            4
            <span>0</span>
            4
          </h1>
        </div>
        <h2>{t('notFoundPage.header')}</h2>
        <Link to="/">
          <Button variant="primary">{t('notFoundPage.goToMain')}</Button>
        </Link>
      </div>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
