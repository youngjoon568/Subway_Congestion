import React from 'react';
import styled from 'styled-components';
import MapContent from './MapContent';

const Container = styled.div`
width: 100%;
height: 100%;
`;

export default function MapPage() {
    return (
        <Container>
            <MapContent />
        </Container>
    );
};