const defaultApiPath = 'api/v1';

export const urls = {
    getStartPage: () => '/',
    login: () => [defaultApiPath, 'login'].join('/'),
    logout: () => [defaultApiPath, 'logout'].join('/'),
    mainPage: () => '/',
    loginPage: () => '/login',
    signUpPage: () => '/signup',
    notFoundPage: () => '*',
};
