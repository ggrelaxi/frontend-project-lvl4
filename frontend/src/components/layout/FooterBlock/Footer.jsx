import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import FooterContainer from './footer.styled';

const FooterBlock = () => {
  const { t } = useTranslation();
  return (
    <FooterContainer className="d-none d-md-flex justify-content-between">
      <Container>
        <Row>
          <Col>{t('common.footer.owner')}</Col>
          <Col className="justify-content-end d-flex">{t('common.footer.description')}</Col>
        </Row>
      </Container>
    </FooterContainer>
  );
};

export default FooterBlock;
