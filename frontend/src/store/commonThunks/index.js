import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthServices } from '../../api';

const getChatData = createAsyncThunk(
  'chat/getChannelAndMessages',
  AuthServices.getChatData,
);

export default getChatData;
