import React, { useState } from 'react';
import _ from 'lodash';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const InputFieldWithControls = ({ onSaveClick, onCancelClick }) => {
    const [text, setText] = useState('');
    return (
        <Box style={{ display: 'flex' }}>

            <TextField size="small"
                variant='outlined'
                autoFocus={true}
                margin='none'
                value={text}
                onChange={(event) => setText(event.target.value)} />

            <IconButton size='small' onClick={() => { setText(''); onSaveClick(text); }}>
                <CheckCircleIcon />
            </IconButton>

            <IconButton size='small' onClick={() => { setText(''); onCancelClick(); }}>
                <CancelIcon />
            </IconButton>

        </Box>
    );
};


export default InputFieldWithControls;