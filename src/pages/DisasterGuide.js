import React from 'react';
import styled from 'styled-components';

const GuideContainer = styled.div`
    font-family: 'Pretendard-Regular';
    padding: 20px;
    line-height: 1.6;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
`;

const SubSectionTitle = styled.h3`
    font-size: 1.2rem;
    margin-top: 20px;
`;

const List = styled.ul`
    margin-left: 20px;
    list-style-type: none;
`;

export const DisasterGuide = () => {
    return (
        <GuideContainer>
            <SectionTitle>포항시</SectionTitle>
            <SubSectionTitle>풍랑</SubSectionTitle>
            <List>
                <li><strong>2024/10/01 12:01:56</strong> - 10.02.~04. 연안사고 주의보 발령. 동해안 높은 파도가 예상되므로 방파제·갯바위·해안가 등 접근 및 입수금지, 연안 안전사고에 주의 바랍니다.</li>
                <li><strong>2024/10/01 12:01:56</strong> - 높은 파도가 일고 있습니다. 낚시꾼·야영객·행락객 등은 해안가, 방파제, 갯바위 등 접근 금지 및 안전사고에 주의 바랍니다.</li>
                <li><strong>2024/10/01 12:01:56</strong> - 강한 바람이 지속되고 높은 파도가 일고 있으니 시설물의 철저한 관리와 방파제·갯바위·해안가 등 접근 및 입수 금지, 안전사고에 주의 바랍니다.</li>
            </List>
            <SubSectionTitle>지진</SubSectionTitle>
            <List>
                <li><strong>2024/10/01 12:01:56</strong> - 포항시 40km 해역 규모 2.1 지진 발생. 추가 지진이 발생할 수 있으니 추가 지진 발생에 유의해 주시기 바랍니다.</li>
            </List>
        </GuideContainer>
    );
};

export default DisasterGuide;
