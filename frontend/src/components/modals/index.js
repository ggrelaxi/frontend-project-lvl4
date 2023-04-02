import { useSelector } from 'react-redux';
import { ADD_CHANNEL_MODAL, REMOVE_CHANNEL_MODAL, RENAME_CHANNEL_MODAL } from '../../store/modalSlice/constants';
import { getActiveModal } from '../../store/modalSlice/selectors';
import AddChannelModal from './AddChannelModal/AddChannelModal';
import RenameChannelModal from './RenameChannelModal/RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal/RemoveChannelModal';

const Modals = () => {
  const activeModal = useSelector(getActiveModal);

  /* eslint-disable indent */
  switch (activeModal) {
    case ADD_CHANNEL_MODAL:
      return <AddChannelModal />;
    case REMOVE_CHANNEL_MODAL:
      return <RemoveChannelModal />;
    case RENAME_CHANNEL_MODAL:
      return <RenameChannelModal />;
    default:
      return null;
  }
  /* eslint-enable indent */
};

export default Modals;
