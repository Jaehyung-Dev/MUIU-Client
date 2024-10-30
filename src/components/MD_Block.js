import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import good from '../svg/good.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import axios from 'axios';

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
    const [diaryData, setDiaryData] = useState({ title: '', content: '', regdate: '', id: null });
    const [userId, setUserId] = useState(null);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleDeleteDiary = async () => {
        const confirmDelete = window.confirm("일기를 삭제하시겠습니까?");
        if (!confirmDelete) return;
    
        try {
            const diaryId = diaryData.diary_id; // diary_id를 가져옵니다
            if (!diaryId) {
                console.error("diary_id가 정의되지 않았습니다.");
                return;
            }
    
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            if (!token) {
                console.error('JWT token not found');
                return;
            }
    
            const response = await axios.delete(`http://localhost:9090/diaries/${diaryId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                alert("일기가 성공적으로 삭제되었습니다.");
                window.location.reload(); // 페이지를 새로 고침하여 최신 일기를 다시 불러옵니다.
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

                    // 최신 일기 요청
                    const response = await axios.get(`http://localhost:9090/diaries/user/${memberSlice.id}/latest`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    
                    if (response.status === 200 && response.data.item) {
                        setDiaryData(response.data.item); // 백엔드 응답의 `item`을 설정
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
                        <img src={good} alt="좋음" />
                        <MoreVertIcon onClick={toggleMenu} style={{ cursor: 'pointer' }} />
                        {menuVisible && (
                            <MenuContainer>
                                <MenuItem>
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
                    <TimeBlock>
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
