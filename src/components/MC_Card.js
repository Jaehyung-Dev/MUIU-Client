import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Card = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
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

const MC_Card = ({ item, onDelete, onEdit }) => {
    return (
        <Card>
            <img src={item.mc_img_num} alt={`이미지 ${item.mcId}`} />
            {/* 삭제 및 수정 버튼 */}
            <DeleteIcon onClick={() => onDelete(item.mcId)} />
            <EditIcon onClick={() => onEdit(item.mcId)} />
        </Card>
    );
};

export default MC_Card;
