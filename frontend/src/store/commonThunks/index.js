import { createAsyncThunk } from '@reduxjs/toolkit';
import { services } from '../../api';

export const getChatData = createAsyncThunk('chat/getChannelAndMessages', services.getChatData);
