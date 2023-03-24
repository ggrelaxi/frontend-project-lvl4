import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { getActiveModal } from '../../../store/modalSlice/selectors';
import { getChannelIdToDelete } from '../../../store/channelsSlice/selectors';
import { REMOVE_CHANNEL_MODAL } from '../../../store/modalSlice/constants';
import { ChatServices } from '../../../api';
import { closeModal } from '../../../store/modalSlice/slice';
import { showNotification } from '../../Notification/notification-emmiter';
import { ERROR_NOTIFICATION } from '../../Notification/notification-type';

export const RemoveChannelModal = () => {
    const activeModal = useSelector(getActiveModal);
    const channelIdToDelete = useSelector(getChannelIdToDelete);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitButtonDisabled(true);
        ChatServices.removeChannel(channelIdToDelete, (error = null) => {
            if (error) {
                showNotification(t('notifications.removeChannelError', ERROR_NOTIFICATION));
            } else {
                dispatch(closeModal());
            }
        });
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
                    <Button variant="primary" type="submit" disabled={isSubmitButtonDisabled}>
                        {t('modals.remove.submit')}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
