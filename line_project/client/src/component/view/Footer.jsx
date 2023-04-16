import React from 'react';
import styled from 'styled-components';
import TextPar from './atoms/TextPar';
import Btn from './atoms/Btn';
import Icon from './atoms/Icon';
import TextLink from './atoms/TextLink';

const FooterTag = styled.footer`
width: 100%;
height: 100px;
position: fixed;
bottom: 0;
z-index: 11;
background: #f4f4f4;
border-top: 1px solid #ddd;
`;

const BtnBar = styled.div`
width: 160px;
margin: 0 auto;
height: 100%;
padding-top: 10px;
display: flex;
justify-content: space-between;
`;

const BtnItem = styled.div`
display: flex;
flex-direction: column;
align-items: center;

a {
  display: block;
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

svg {
  font-size: 1.8rem;
  color: #444;
}

p {
  padding-top: 5px;
}
`;


export default function Footer() {
  return (
    <FooterTag>
      <BtnBar>
        <BtnItem>
          <TextLink to={"/"}>
            <Icon type={"map"} />
            <TextPar size={12}>map</TextPar>
          </TextLink>
        </BtnItem>
        <BtnItem>
          <TextLink to={"/subway"}>
            <Icon type={"subway"} />
            <TextPar size={12}>subway</TextPar>
          </TextLink>
        </BtnItem>
      </BtnBar>
    </FooterTag>
  );
};