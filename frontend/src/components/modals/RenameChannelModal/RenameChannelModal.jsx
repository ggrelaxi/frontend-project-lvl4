import { Alert, Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveModal } from '../../../store/modalSlice/selectors';
import { getRenamedChannelName, getChannelsName, getChannelIdToRename } from '../../../store/channelsSlice/selectors';
import { RENAME_CHANNEL_MODAL } from '../../../store/modalSlice/constants';
import { closeModal } from '../../../store/modalSlice/slice';
import { buildValidationSchema } from '../validation-schema';
import { ChatServices } from '../../../api';

export const RenameChannelModal = () => {
    const activeModal = useSelector(getActiveModal);
    const createdChannelsName = useSelector(getChannelsName);
    const channelName = useSelector(getRenamedChannelName);
    const channelIdToRename = useSelector(getChannelIdToRename);
    const [isRemoveChannelModalDisabled, setIsRemoveChannelModalDisabled] = useState(false);
    const dispatch = useDispatch();

    const { values, handleSubmit, handleChange, errors, isValid, dirty } = useFormik({
        initialValues: {
            channelTitle: channelName,
        },
        validationSchema: buildValidationSchema(createdChannelsName),
        onSubmit: ({ channelTitle }) => {
            setIsRemoveChannelModalDisabled(true);
            ChatServices.renameChannel({ name: channelTitle, id: channelIdToRename }, () => {
                dispatch(closeModal());
            });
        },
    });

    const handleClose = () => {
        dispatch(closeModal());
    };

    const isModalOpen = activeModal === RENAME_CHANNEL_MODAL;
    const isSubmitDisabled = !isValid || !dirty || isRemoveChannelModalDisabled;

    return (
        <Modal show={isModalOpen} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Переименовать канал</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-none">
                    <Form.Group>
                        <Form.Control
                            type="text"
                            value={values.channelTitle}
                            name="channelTitle"
                            placeholder="Название канала"
                            autoFocus
                            onChange={handleChange}
                            isInvalid={'channelTitle' in errors}
                            className="mb-1"
                        />
                        {!isValid && (
                            <Alert className="m-0 p-1" variant="light">
                                {errors.channelTitle}
                            </Alert>
                        )}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
                        Отправить
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
