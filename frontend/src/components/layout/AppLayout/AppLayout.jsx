import React from 'react';
import { MainBlock } from '../MainBlock/MainBlock';
import { HeaderBlock } from '../HeaderBlock/HeaderBlock';
import { FooterBlock } from '../FooterBlock/Footer';
import { LayoutContainer } from './layout.styled';

export const AppLayout = () => {
    return (
        <LayoutContainer className="bg-light">
            <HeaderBlock className="bg-white" />
            <MainBlock />
            <FooterBlock className="bg-white" />
        </LayoutContainer>
    );
};
