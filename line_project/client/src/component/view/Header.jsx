import React from 'react';
import styled from 'styled-components';
import Btn from './atoms/Btn';
import Icon from './atoms/Icon';
import TextTitle from './atoms/TextTitle';

const HeaderTag = styled.header`
width: 100%;
height: 60px;
padding: 0 30px;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid #ddd;
position: fixed;
top: 0;
z-index: 11;
`;

const IconItem = styled.div`
svg {
  font-size: 1.4rem;
}
`;

export default function Header({ text, type }) {
    return (
        <HeaderTag>
            <TextTitle size={20} type={"xl"}>{ text }</TextTitle>
            <IconItem><Btn><Icon type={type ? type : "menu"} /></Btn></IconItem>
        </HeaderTag>
    );
};