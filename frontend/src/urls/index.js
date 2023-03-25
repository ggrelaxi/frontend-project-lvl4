const defaultApiPath = 'api/v1';

export const urls = {
    login: () => [defaultApiPath, 'login'].join('/'),
    logout: () => [defaultApiPath, 'logout'].join('/'),
    signup: () => [defaultApiPath, 'signup'].join('/'),
    getChatData: () => [defaultApiPath, 'data'].join('/'),
    mainPage: () => '/',
    loginPage: () => '/login',
    signUpPage: () => '/signup',
    notFoundPage: () => '*',
};
