import React, { useCallback, useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { post } from '../apis/mindColumnApis';

const MindColumnPost = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [uploadFiles, setUploadFiles] = useState([]); // 상태로 관리

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // 기존 파일 목록에 새 파일 추가 (순서를 유지)
    setUploadFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // 파일 삭제 시 호출되는 함수
  const handleFileRemove = (index) => {
    setUploadFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 파일 순서 위로 이동
  const moveFileUp = (index) => {
    if (index === 0) return; // 첫 번째 파일은 위로 이동 불가

    setUploadFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]]; // Swap
      return newFiles;
    });
  };

  // 파일 순서 아래로 이동
  const moveFileDown = (index) => {
    if (index === uploadFiles.length - 1) return; // 마지막 파일은 아래로 이동 불가

    setUploadFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]; // Swap
      return newFiles;
    });
  };

  // 파일 업로드 핸들러
  const handlePost = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData();

    // 제목 추가
    const title = e.target.querySelector('#outlined-basic').value;
    formData.append('title', title);

    // 선택한 파일을 클릭 순서대로 formData에 추가
    uploadFiles.forEach((file, index) => {
      formData.append('uploadFiles', file);
    });

    // Redux 액션을 통해 서버로 데이터 전송
    dispatch(post(formData)).then((action) => {
      if (action.type === 'boards/post/fulfilled') {
        navi('/board-list');
      }
    });

  }, [dispatch, navi, uploadFiles]);

  return (
    <form onSubmit={handlePost}>
      <TextField id='outlined-basic' label='제목' variant='outlined' fullWidth />
      <br /><br />
      <TextField type='file' inputProps={{ multiple: true }} onChange={handleFileChange} />
      <br /><br />
      <Button type='submit' variant='contained' color='primary'>완료</Button>

      {/* 선택한 파일 미리보기와 순서 표시 */}
      <div style={{ marginTop: '20px' }}>
        <h3>업로드할 파일 목록 (순서 조정 가능)</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {uploadFiles.map((file, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '10px' }}>{index + 1}. {file.name}</span>
              
              {/* 미리보기 이미지 */}
              {file.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`미리보기-${index}`}
                  style={{ width: '100px', height: '70px', objectFit: 'cover', marginRight: '10px' }}
                />
              )}
              
              {/* 위로 이동 버튼 */}
              <IconButton onClick={() => moveFileUp(index)} color='primary' disabled={index === 0}>
                <ArrowUpwardIcon />
              </IconButton>
              
              {/* 아래로 이동 버튼 */}
              <IconButton onClick={() => moveFileDown(index)} color='primary' disabled={index === uploadFiles.length - 1}>
                <ArrowDownwardIcon />
              </IconButton>

              {/* 삭제 버튼 */}
              <IconButton onClick={() => handleFileRemove(index)} color='secondary'>
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default MindColumnPost;
