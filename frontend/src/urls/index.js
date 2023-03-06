const defaultApiPath = 'api/v1';

export const urls = {
    getStartPage: () => '/',
    login: () => [defaultApiPath, 'login'].join('/'),
    logout: () => [defaultApiPath, 'logout'].join('/'),
    getChatData: () => [defaultApiPath, 'data'].join('/'),
    mainPage: () => '/',
    loginPage: () => '/login',
    signUpPage: () => '/signup',
    notFoundPage: () => '*',
};
