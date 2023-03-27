import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveModal } from '../../../store/modalSlice/selectors';
import { getChannelsName } from '../../../store/channelsSlice/selectors';
import { ADD_CHANNEL_MODAL } from '../../../store/modalSlice/constants';
import { closeModal } from '../../../store/modalSlice/slice';
import { buildValidationSchema } from '../validation-schema';
import { ChatServices } from '../../../api';
import { showNotification } from '../../Notification/notification-emmiter';
import { ERROR_NOTIFICATION } from '../../Notification/notification-type';
import { useWordFilterContext } from '../../../hooks/useWordFilterContext';

export const AddChannelModal = () => {
    const activeModal = useSelector(getActiveModal);
    const createdChannels = useSelector(getChannelsName);
    const [isAddChannelModalDisabled, setIsAddChannelModalDisabled] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { wordFilter } = useWordFilterContext();

    const { values, handleSubmit, handleChange, errors, isValid, dirty } = useFormik({
        initialValues: {
            channelTitle: '',
        },
        validationSchema: buildValidationSchema(createdChannels),
        onSubmit: ({ channelTitle }) => {
            setIsAddChannelModalDisabled(true);

            ChatServices.newChannel({ name: wordFilter.clean(channelTitle) }, (error = null) => {
                if (error) {
                    showNotification(t('notifications.newChannelError'), ERROR_NOTIFICATION);
                } else {
                    dispatch(closeModal());
                }
            });
        },
    });

    const handleClose = () => {
        dispatch(closeModal());
    };

    const isModalOpen = activeModal === ADD_CHANNEL_MODAL;
    const isSubmitDisabled = !isValid || !dirty || isAddChannelModalDisabled;

    return (
        <Modal show={isModalOpen} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('modals.add.header')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-none">
                    <Form.Group controlId="newChannelId">
                        <Form.Label className="visually-hidden">Имя канала</Form.Label>
                        <Form.Control
                            type="text"
                            value={values.channelTitle}
                            name="channelTitle"
                            placeholder={t('modals.add.placeholder')}
                            autoFocus
                            onChange={handleChange}
                            isInvalid={'channelTitle' in errors}
                            className="mb-1"
                        />
                        {errors.channelTitle ? (
                            <div className="py-2 text-danger">
                                {t(errors.channelTitle.transKey, {
                                    minValue: errors.channelTitle.min,
                                    maxValue: errors.channelTitle.max,
                                })}
                            </div>
                        ) : null}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modals.add.cancel')}
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
                        {t('modals.add.submit')}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
