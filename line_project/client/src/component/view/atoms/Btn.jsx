import React from 'react'
import styled from 'styled-components';

const BtnTag = styled.button`
width: 100%;
height: 100%;
cursor: pointer;
border: none;
background: none;
`;

export default function Btn({ children }) {
    return (
        <BtnTag>{children}</BtnTag>
    );
};
