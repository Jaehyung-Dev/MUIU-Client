import React from 'react'
import styled from 'styled-components'

const Banner = styled.div`
    background-image: url('${process.env.PUBLIC_URL}/images/mind-check-header.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 300px;

    @media (max-width: 400px){
        height: 200px;
    }

    @media (max-width: 500px){
        height: 230px;
    }
`;

const Board = styled.div`
    background-image: url('${process.env.PUBLIC_URL}/images/mind-check-board.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%; 
    height: 600px;

    @media (max-width: 400px){
        height: 400px;
    }

    @media (max-width: 500px){
        height: 500px;
    }
`;

const MindCheck = () => {
  return (
    <>
        <Banner></Banner>
        <Board></Board>
    </>
  )
}

export default MindCheck