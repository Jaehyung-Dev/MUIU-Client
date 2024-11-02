import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import angry from '../svg/angry.svg';
import depress from '../svg/depress.svg';
import normal from '../svg/normal.svg';
import good from '../svg/good.svg';
import happy from '../svg/happy.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    background-color: ${({ mood }) => {
        switch (mood) {
            case 'dissatisfied':
                return '#FF3B30';
            case 'bad':
                return '#FF9500';
            case 'soso':
                return '#FFCC00';
            case 'good':
                return '#34C759';
            case 'happy':
                return '#00C7BE';
            default:
                return '#e0e0e0'; // 기본 회색
        }
    }};
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

const moodIcons = {
    dissatisfied: angry,
    bad: depress,
    soso: normal,
    good: good,
    happy: happy,
};

const MD_Block = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [diaryData, setDiaryData] = useState({ title: '', content: '', regdate: '', id: null, mood: '' });
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();

    const handleEditDiary = () => {
        navigate('/my-diary-write', { state: { diaryData } });
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleDeleteDiary = async () => {
        const confirmDelete = window.confirm("일기를 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            const diaryId = diaryData.diary_id;
            if (!diaryId) {
                console.error("diary_id가 정의되지 않았습니다.");
                return;
            }

            const token = sessionStorage.getItem('ACCESS_TOKEN');
            if (!token) {
                console.error('JWT token not found');
                return;
            }

            const response = await axios.delete(`https://www.마음이음api.site/diaries/${diaryId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                alert("일기가 성공적으로 삭제되었습니다.");
                window.location.reload();
            } else {
                console.error('일기 삭제 중 오류');
            }
        } catch (error) {
            console.error('일기 삭제 오류:', error);
            alert("일기 삭제 중 오류가 발생했습니다.");
        }
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
                    const token = sessionStorage.getItem('ACCESS_TOKEN');
                    if (!token) {
                        console.error('JWT token not found');
                        return;
                    }

                    const response = await axios.get(`https://www.마음이음api.site/diaries/user/${memberSlice.id}/latest`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    
                    if (response.status === 200 && response.data.item) {
                        setDiaryData(response.data.item);
                        console.log('Diary data set:', response.data.item);
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
        <>
            {diaryData ? (
                <DiaryEntry>
                    <EntryHeader>
                        <img src={moodIcons[diaryData.mood] || good} alt="기분" />
                        <MoreVertIcon onClick={toggleMenu} style={{ cursor: 'pointer' }} />
                        {menuVisible && (
                            <MenuContainer>
                                <MenuItem onClick={handleEditDiary}>
                                    <EditIcon />
                                    <span>Edit</span>
                                </MenuItem>
                                <MenuItem onClick={handleDeleteDiary}>
                                    <DeleteIcon />
                                    <span>Delete</span>
                                </MenuItem>
                            </MenuContainer>
                        )}
                    </EntryHeader>
                    <TimeBlock mood={diaryData.mood}>
                        <AccessTimeFilledIcon style={{ width: '15px' }} />
                        <EntryDateText>{diaryData.regdate ? diaryData.regdate.split('T')[0] : ''}</EntryDateText>
                    </TimeBlock>
                    <EntryTitle>{diaryData.title}</EntryTitle>
                    <EntryContent>{diaryData.content}</EntryContent>
                </DiaryEntry>
            ) : (
                <p>최신 일기를 불러올 수 없습니다.</p>
            )}
        </>
    );
};

export default MD_Block;
