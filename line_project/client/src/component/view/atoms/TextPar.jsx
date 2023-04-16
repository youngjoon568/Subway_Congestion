import React from 'react';
import styled from 'styled-components';

const Text = styled.p`

`;

export default function TextPar({ size, children }) {
  return (
    <Text style={{ fontSize: `${size}px` }}>{children}</Text>
  );
};