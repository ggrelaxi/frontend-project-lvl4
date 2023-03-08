import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthServices } from '../../api';

export const getChatData = createAsyncThunk('chat/getChannelAndMessages', AuthServices.getChatData);
