import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import good from '../svg/good.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import axios from 'axios'; // API 호출을 위한 axios

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
    const [diaryData, setDiaryData] = useState({ title: '', content: '', date: '' });
    const [userId, setUserId] = useState(null);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        const fetchDiaryData = async () => {
            try {
                const persistRoot = sessionStorage.getItem('persist:root');
                if (!persistRoot) {
                    console.error('유저 정보 없음');
                    return;
                }

                const parsedRoot = JSON.parse(persistRoot);
                const memberSlice = JSON.parse(parsedRoot.memberSlice);

                if (memberSlice.isLogin && memberSlice.id) {
                    setUserId(memberSlice.id);

                    // Fetch diary data using userId
                    const response = await axios.get(`/api/diary/${memberSlice.id}`);
                    if (response.status === 200) {
                        setDiaryData(response.data);
                    } else {
                        console.error('일기 데이터를 가져오는 중 오류');
                    }
                }
            } catch (error) {
                console.error('오류:', error);
            }
        };

        fetchDiaryData();
    }, []);

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
                <EntryDateText>{diaryData.date}</EntryDateText>
            </TimeBlock>
            <EntryTitle>{diaryData.title}</EntryTitle>
            <EntryContent>{diaryData.content}</EntryContent>
        </DiaryEntry>
    );
};

export default MD_Block;
