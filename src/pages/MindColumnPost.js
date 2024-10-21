import React from 'react'
import { TextField, FormControl } from '@mui/material';

const MindColumnPost = () => {
  return (
    <form>
        <TextField id='outlined-basic' label='제목' variant='outlined' />
        <br/><br/>
        <TextField type='file' inputProps={{multiple: true}}/>
        <br/><br/>
        <button type='submit'>완료</button>
    </form>
  )
}

export default MindColumnPost