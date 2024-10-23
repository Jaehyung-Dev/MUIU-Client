import styled from 'styled-components';
import React, { useState } from 'react'
import good from '../svg/good.svg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


const DiaryEntry = styled.div`
    width: 85%;
    margin: 1rem auto 3rem;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    position: relative;
    box-sizing: border-box;
`;

const EntryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
`;

const TimeBlock = styled.div`
    display: inline-flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 5px;
    background-color: #34C759;
    padding: 5px 10px;
    border-radius: 5px;
`;

const EntryDateText = styled.span`
    font-size: 14px;
    color: #555;
`;

const EntryTitle = styled.h2`
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 10px 0;
    font-size: 1.2rem;
    font-weight: bold;
`;

const EntryContent = styled.p`
    margin: 10px 0;
    font-size: 1rem;
    color: #333;
    line-height: 1.5;
`;

const MenuContainer = styled.div`
    position: absolute;
    top: 40px;
    right: 0;
    width: 120px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    padding: 10px;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const MD_Block = () => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

  return (
    <DiaryEntry>
        <EntryHeader>
            <img src={good} alt="좋음" />
            <MoreVertIcon onClick={toggleMenu} style={{ cursor: 'pointer' }} />
            {menuVisible && (
                <MenuContainer>
                    <MenuItem>
                        <EditIcon />
                        <span>Edit</span>
                    </MenuItem>
                    <MenuItem>
                        <DeleteIcon />
                        <span>Delete</span>
                    </MenuItem>
                </MenuContainer>
            )}
        </EntryHeader>
        <TimeBlock>
            <AccessTimeFilledIcon style={{ width: '15px' }} />
            <EntryDateText>28 May 21</EntryDateText>
        </TimeBlock>
        <EntryTitle>비트캠프에서의 첫 날</EntryTitle>
        <EntryContent>
            오늘은 비트캠프에 처음 왔다.
            <br />
            처음에는 많이 긴장했지만, 새로운 분들이 친절하게 맞아주셔서 금방 긴장이 풀렸다.
            <br /><br />
            오늘은 HTML, CSS, JavaScript에 대해 간단하게 배웠다.
            앞으로도 열심히 해야지.
        </EntryContent>
    </DiaryEntry>
  );
};

export default MD_Block;