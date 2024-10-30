import React, { useCallback, useState } from 'react';
import { TextField, 
  Button, 
  Grid, 
  Card, 
  CardMedia, 
  CardActions, 
  IconButton,
  Container,
  Typography, } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowUpward, ArrowDownward, Delete, Add } from '@mui/icons-material';
import { post, update } from '../apis/mindColumnApis';

const MindColumnPost = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const editingColumn = state?.column || null;

  const [title, setTitle] = useState(editingColumn ? editingColumn.mc_title : '');
  const [images, setImages] = useState(editingColumn ? editingColumn.mcfList.map(image => ({
    ...image,
    isNew: false,
  })) : []);

  const [deletedFiles, setDeletedFiles] = useState([]); 

  const handleImageOrderChange = useCallback((oldIndex, newIndex) => {
    const updatedList = [...images];
    const [movedItem] = updatedList.splice(oldIndex, 1);
    updatedList.splice(newIndex, 0, movedItem);
    setImages(updatedList);
  }, [images]);

  const handleAddImage = useCallback((e) => {
    const files = e.target.files;
    if (files) {
      const newImagesArray = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        isNew: true
      }));
      setImages((prevImages) => [...prevImages, ...newImagesArray]);
    }
  }, []);

  const handleDeleteImage = useCallback((index) => {
    const imageToDelete = images[index];
    if (!imageToDelete.isNew) {
      setDeletedFiles((prevDeletedFiles) => [...prevDeletedFiles, imageToDelete.mcf_id]);
    }
    setImages(images.filter((_, i) => i !== index));
  }, [images]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const data = new FormData();

    const imageMetadata = images.map((image) => ({
      mcfId: image.mcf_id,
      mcfName: image.isNew ? image.file.name : image.mcf_name,
      isNew: image.isNew,
    }));

    data.append("mindColumnDto", JSON.stringify({
      mc_title: title,
      id: editingColumn?.mc_id,
      mcfList: imageMetadata,
    }));

    images.forEach((image, index) => {
      if(image.isNew && image.file) {
        data.append("mcfList", image.file);
      }
    });

    deletedFiles.forEach(id => {
      data.append("deletedFiles", id);
    });

    try {
      if (editingColumn) {
        // 수정 모드일 때
        await dispatch(update({ id: editingColumn.mc_id, data }));
      } else {
        // 새 게시물 작성일 때
        await dispatch(post(data));
      }
      navi('/mind-column');
    } catch (error) {
      console.error('Error while submitting:', error);
    }
  }, [title, images, deletedFiles, editingColumn, dispatch, navi]);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        {editingColumn ? '수정하기' : '새 글 작성하기'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: '1rem' }}
        />

        {/* 기존 및 새 이미지 목록 */}
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={`existing-${index}`}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={image.isNew ? image.preview : `https://kr.object.ncloudstorage.com/bitcamp126/mindColumn/${image.mcf_name}`}
                  alt="이미지"
                />
                <CardActions>
                  <IconButton onClick={() => handleDeleteImage(index)} color="error">
                    <Delete />
                  </IconButton>
                  {index > 0 && (
                    <IconButton onClick={() => handleImageOrderChange(index, index - 1)}>
                      <ArrowUpward />
                    </IconButton>
                  )}
                  {index < images.length - 1 && (
                    <IconButton onClick={() => handleImageOrderChange(index, index + 1)}>
                      <ArrowDownward />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 이미지 추가 버튼 */}
        <Button
          variant="contained"
          component="label"
          startIcon={<Add />}
          style={{ marginTop: '1rem', marginBottom: '1rem' }}
        >
          이미지 추가
          <input
            type="file"
            multiple
            hidden
            onChange={handleAddImage}
          />
        </Button>

        {/* 제출 버튼 */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          제출
        </Button>
      </form>
    </Container>
  );
};

export default MindColumnPost;
