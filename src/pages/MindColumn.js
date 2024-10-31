import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, getList } from '../apis/mindColumnApis';

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1rem;
    padding: 1rem;
`;

const Card = styled.div`
    width: 100%;
    padding-top: 100%; /* 1:1 비율 유지 */
    position: relative;
    // border: 1px solid black;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`;

const ModalOverlay = styled.div`
    display: ${(props) => (props.$visible ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    padding: 1rem;
    border-radius: 10px;
    width: 100vw;
    height: 100vh;
    position: relative;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        max-width: 80%;
        max-height: 80%;
        border-radius: 10px;
    }

    .close-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        font-size: 1.5rem;
        background: none;
        border: none;
        color: #333;
        cursor: pointer;
    }
`;

const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background-color: white;
    border: none;
    color: #333;
    cursor: pointer;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    ${(props) => (props.$right ? 'right: 1rem;' : 'left: 1rem;')}

    // &:hover {
    //     transform: scale(1.1);
    // }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 1.5rem;
    background-color: white;
    border: none;
    color: #333;
    cursor: pointer;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`;

const PageNumber = styled.div`
    position: absolute;
    bottom: 1rem;
    font-size: 1rem;
    color: #bbb;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
`;

const Upload = styled.button`
    margin: 0.5rem auto 0.5rem 0;
    width: 5rem;
`;

const AdminButton = styled.div`
    position: absolute;
    bottom: 5rem;
    width: 100%;
    padding: 0 auto;

    button {
        width: 50%;
    }
`;

export const MindColumn = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const columns = useSelector(state => state.mindColumnSlice.mindColumn);
    useEffect(() => {
        console.log('columns:', columns); // Redux에서 가져온 전체 데이터 확인
        if (columns && columns.content) {
            console.log('columns.content:', columns.content); // content가 있는지 확인
        }
    }, [columns]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getList({ page: 0, size: 12 })); // 데이터를 로드
    }, [dispatch]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [card, setCard] = useState({
        mc_id: null,
        mc_img_num: 0,
        mc_title: '',
        mcfList: [{
            mcf_id: null,
            mc_id: null,
            mcf_name: '',
            mcf_originname: '',
            mcf_path: '',
          },],
        regdate: '',
    });

    const openModal = useCallback((card) => {
        setCard(card);
        setCurrentImageIndex(0);
        setModalOpen(true);
    }, []);
    const closeModal = useCallback(() => {setModalOpen(false)}, []);
    const showNextImage = useCallback(() => {setCurrentImageIndex((prevIndex) => (prevIndex + 1) % card.mc_img_num)}, [card.mc_img_num]);
    const showPrevImage = useCallback(() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + card.mc_img_num) % card.mc_img_num), [card.mc_img_num]);

    const navi = useNavigate();

    const handleEdit = useCallback((column) => {
        navi('/mind-column/post', {state: {column}});
    }, [navi]);

    const handleDelete = useCallback(async (column) => {
        await dispatch(deleteCard(column.mc_id));
        navi('/mind-column');
    }, [dispatch, navi]);

    const {role} = useSelector((state) => state.memberSlice);

    return (
        <>
            {
                role === "ROLE_ADMIN" && (
                    <Upload type='button' onClick={() => navi('/mind-column/post')}>업로드</Upload>
                )
            }
            <Cards>
                {columns.content && columns.content.map((column, index) =>
                    <Card key={index} onClick={() => openModal(column)}>
                        <img src={`https://kr.object.ncloudstorage.com/bitcamp126/mindColumn/${column.mcfList[0].mcf_name}`} alt={`${column.mc_title}`}></img>
                    </Card>
                )} 
            </Cards>
            <ModalOverlay $visible={isModalOpen}>
                <ModalContent>
                    <CloseButton onClick={closeModal}>
                        <ClearIcon fontSize='large'/>
                    </CloseButton>
                    <img src={`https://kr.object.ncloudstorage.com/bitcamp126/mindColumn/${card.mcfList[currentImageIndex].mcf_name}`} alt={`${card.mc_title}`}/>
                    {currentImageIndex > 0 && 
                        <NavButton onClick={showPrevImage}>
                            <NavigateBeforeIcon fontSize='large'/>    
                        </NavButton>}
                    {currentImageIndex < card.mc_img_num - 1 &&
                        <NavButton $right onClick={showNextImage}>
                            <NavigateNextIcon fontSize='large'/>    
                        </NavButton>}
                    {
                        role === "ROLE_ADMIN" && (
                            <AdminButton>
                                <button onClick={() => handleEdit(card)}>수정</button>
                                <button onClick={() => handleDelete(card)}>삭제</button>
                            </AdminButton>
                        )
                    }
                    <PageNumber>{`${currentImageIndex + 1} / ${card.mc_img_num}`}</PageNumber>
                </ModalContent>
            </ModalOverlay>
        </>
    );
};

export default MindColumn;