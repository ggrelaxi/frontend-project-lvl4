import * as Yup from 'yup';

const buildValidationSchema = (createdChannels) => Yup.object().shape({
  channelTitle: Yup.string().required().min(3).max(20)
    .notOneOf(createdChannels),
});

export default buildValidationSchema;
