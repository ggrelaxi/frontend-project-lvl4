import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveModal, getChannelIdToRename } from '../../../store/modalSlice/selectors';
import { getRenamedChannelName, getChannelsName } from '../../../store/channelsSlice/selectors';
import { RENAME_CHANNEL_MODAL } from '../../../store/modalSlice/constants';
import { closeModal } from '../../../store/modalSlice/slice';
import buildValidationSchema from '../validation-schema';
import showNotification from '../../Notification/notification-emmiter';
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from '../../Notification/notification-type';
import useWordFilterContext from '../../../hooks/useWordFilterContext';
import useChatApiContext from '../../../hooks/useChatApiContext';

const RenameChannelModal = () => {
  const activeModal = useSelector(getActiveModal);
  const createdChannelsName = useSelector(getChannelsName);
  const channelName = useSelector(getRenamedChannelName);
  const channelIdToRename = useSelector(getChannelIdToRename);
  const [isRemoveChannelModalDisabled, setIsRemoveChannelModalDisabled] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { wordFilter } = useWordFilterContext();
  const api = useChatApiContext();

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      channelTitle: channelName,
    },
    validationSchema: buildValidationSchema(createdChannelsName),
    onSubmit: async ({ channelTitle }) => {
      setIsRemoveChannelModalDisabled(true);

      try {
        await api.renameChannel({ name: wordFilter.clean(channelTitle), id: channelIdToRename });
        showNotification(t('notifications.renameChannel'), SUCCESS_NOTIFICATION);

        dispatch(closeModal());
      } catch (error) {
        showNotification(t('notifications.renameChannelError'), ERROR_NOTIFICATION);
      }
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
          <Modal.Title>{t('modals.rename.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-none">
          <Form.Group controlId="renameChannelId">
            <Form.Label className="visually-hidden">Имя канала</Form.Label>

            <Form.Control
              type="text"
              value={values.channelTitle}
              name="channelTitle"
              placeholder={t('modals.rename.description')}
              autoFocus
              onChange={handleChange}
              isInvalid={'channelTitle' in errors}
              className="mb-1"
            />

            {errors.channelTitle ? (
              <div className="py-2 text-danger">{t(errors.channelTitle.transKey)}</div>
            ) : null}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modals.rename.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
            {t('modals.rename.submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RenameChannelModal;
