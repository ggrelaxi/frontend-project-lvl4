import React from 'react';
// import { AppLayoutContainer } from './app-container.styled';
import { Main } from '../main';
import { Header } from '../header';
import { Footer } from '../footer';

export const AppLayout = () => {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
};
