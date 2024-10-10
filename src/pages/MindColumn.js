import React from 'react';
import styled from 'styled-components';

const Cards = styled.div`
    display: grid;
	grid-template-columns: repeat(3, minmax(100px, 1fr));
	gap: 1rem;
`;

const Card = styled.div`
    width: 10rem;
    height: 15rem;
    margin: 1rem;
    border: 1px solid black;
    border-radius: 10px;
`;

export const MindColumn = () => {
    return (
        <>
            <Cards>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </Cards>
        </>
    );
};

export default MindColumn;