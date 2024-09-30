import React from 'react';
import styled from 'styled-components';

const DiaryBackground = styled.div`
    width: 100%;
    min-height: 90vh;
    background-color: #efefef;
`;

const DiaryContainer = styled.div`
    width: 95%;
    margin: 0 auto;
`;

export const MyDiary = () => {
    return (
        <DiaryBackground>
            <DiaryContainer>
                
            </DiaryContainer>
        </DiaryBackground>
    );
};

export default MyDiary;