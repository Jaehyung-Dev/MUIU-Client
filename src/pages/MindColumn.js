import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { fetchMindColumns, deleteImage, updateImage } from '../slices/mindColumnSlice';
import MC_Card from '../components/MC_Card';

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1rem;
    padding: 1rem;
`;

export const MindColumn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [items, setItems] = useState([]); // 로딩된 이미지 목록
    const [page, setPage] = useState(0); // 페이지 번호
    const itemsPerPage = 12; // 초기 로드할 이미지 개수
    const loadMoreCount = 3; // 추가 로드할 이미지 개수

    const mindColumns = useSelector((state) => state.mindColumnSlice.mindColumn);

    // useEffect(() => {
    //     dispatch(fetchMindColumns()); // 컴포넌트 마운트 시 데이터 로드
    // }, [dispatch]);

    useEffect(() => {
        // 데이터가 최신순으로 정렬되도록 정렬
        const sortedMindColumns = [...mindColumns].sort((a, b) => new Date(b.regdate) - new Date(a.regdate));
        setItems(sortedMindColumns.slice(0, itemsPerPage));
    }, [mindColumns]);

    // 무한 스크롤에서 데이터를 더 로드하는 함수
    const fetchMoreData = () => {
        setTimeout(() => {
            const nextPage = page + 1;
            const startIndex = nextPage * loadMoreCount;
            const endIndex = startIndex + loadMoreCount;

            // 새로운 아이템 추가
            setItems((prevItems) => [
                ...prevItems,
                ...mindColumns.slice(startIndex, endIndex)
            ]);
            setPage(nextPage);
        }, 1500);
    };

    // const handleDelete = (mcId) => {
    //     if (window.confirm('정말로 삭제하시겠습니까?')) {
    //         dispatch(deleteImage(mcId));
    //     }
    // };

    // const handleEdit = (mcId) => {
    //     const newTitle = prompt('새로운 제목을 입력하세요:');
    //     if (newTitle) {
    //         dispatch(updateImage({ mcId, mindColumnDto: { mcId, mcTitle: newTitle } }));
    //     }
    // };

    return (
        <>
            <button type='button' onClick={() => navigate('/mind-column/post')}>업로드</button>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={items.length < mindColumns.length} // 전체 데이터보다 적으면 더 로드
                loader={<h4>로딩 중...</h4>}
                endMessage={<p style={{ textAlign: 'center' }}>모든 데이터를 불러왔습니다.</p>}
            >
                <Cards>
                    {items.map((item) => (
                        <MC_Card
                            key={item.mcId}
                            item={item}
                            // onDelete={handleDelete}
                            // onEdit={handleEdit}
                        />
                    ))}
                </Cards>
            </InfiniteScroll>
        </>
    );
};

export default MindColumn;
