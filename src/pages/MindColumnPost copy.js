import React, { useCallback } from 'react'
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const MindColumnPost = () => {

  const navi = useNavigate();
  const dispatch = useDispatch();
  const uploadFiles = [];

  const handlePost = useCallback((e) => {
    e.preventDefault();

  }, [dispatch, navi, uploadFiles]);

  return (
    <form onSubmit={handlePost}>
        <TextField id='outlined-basic' label='제목' variant='outlined' />
        <br/><br/>
        <TextField type='file' inputProps={{multiple: true}}/>
        <br/><br/>
        <button type='submit'>완료</button>
    </form>
  )
}

export default MindColumnPost