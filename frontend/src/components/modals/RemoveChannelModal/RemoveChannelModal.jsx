import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getActiveModal } from '../../../store/modalSlice/selectors';
import { getChannelIdToDelete } from '../../../store/channelsSlice/selectors';
import { REMOVE_CHANNEL_MODAL } from '../../../store/modalSlice/constants';
import { ChatServices } from '../../../api';
import { closeModal } from '../../../store/modalSlice/slice';

export const RemoveChannelModal = () => {
    const activeModal = useSelector(getActiveModal);
    const channelIdToDelete = useSelector(getChannelIdToDelete);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitButtonDisabled(true);
        ChatServices.removeChannel(channelIdToDelete, () => {
            dispatch(closeModal());
        });
    };

    const isModalOpen = activeModal === REMOVE_CHANNEL_MODAL;

    return (
        <Modal show={isModalOpen} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить канал</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-none">Вы уверены?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitButtonDisabled}>
                        Отправить
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
