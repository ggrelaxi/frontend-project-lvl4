import * as Yup from 'yup';

export const buildValidationSchema = (createdChannels) => {
    return Yup.object().shape({
        channelTitle: Yup.string().required().min(3).max(20).notOneOf(createdChannels),
    });
};
