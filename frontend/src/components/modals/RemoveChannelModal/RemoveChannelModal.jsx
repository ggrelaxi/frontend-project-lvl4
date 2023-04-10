import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { getActiveModal, getChannelIdToDelete } from '../../../store/modalSlice/selectors';
import { REMOVE_CHANNEL_MODAL } from '../../../store/modalSlice/constants';
import { closeModal } from '../../../store/modalSlice/slice';
import showNotification from '../../Notification/notification-emmiter';
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from '../../Notification/notification-type';
import useChatApiContext from '../../../hooks/useChatApiContext';

const RemoveChannelModal = () => {
  const activeModal = useSelector(getActiveModal);
  const channelIdToDelete = useSelector(getChannelIdToDelete);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const api = useChatApiContext();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitButtonDisabled(true);
    try {
      await api.removeChannel({ id: channelIdToDelete });
      showNotification(t('notifications.removeChannel', SUCCESS_NOTIFICATION));
    } catch (error) {
      dispatch(closeModal());
      showNotification(t('notifications.removeChannelError', ERROR_NOTIFICATION));

    }
  };

  const isModalOpen = activeModal === REMOVE_CHANNEL_MODAL;

  return (
    <Modal show={isModalOpen} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.remove.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-none">{t('modals.remove.description')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modals.remove.cancel')}
          </Button>
          <Button variant="danger" type="submit" disabled={isSubmitButtonDisabled}>
            {t('modals.remove.submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RemoveChannelModal;
