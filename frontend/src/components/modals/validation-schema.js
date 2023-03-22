import * as Yup from 'yup';

export const buildValidationSchema = (createdChannels) => {
    return Yup.object().shape({
        channelTitle: Yup.string()
            .required('channel is required')
            .min(3, 'minimum 4')
            .max(20, 'max 20')
            .notOneOf(createdChannels),
    });
};
