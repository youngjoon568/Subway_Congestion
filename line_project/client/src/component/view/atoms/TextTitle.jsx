import React from 'react';
import styled from 'styled-components';

const Text = styled.h1`

`;

export default function TextTitle({ size, children }) {
  return (
    <Text style={{ fontSize: `${size}px` }}>{children}</Text>
  );
};