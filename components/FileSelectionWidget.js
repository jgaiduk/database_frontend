import React, { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import ImageUploadStyles from '../styles/ImageUploadStyles';


const FileSelectionWidget = ({ type, title, onChange , disabled}) => {
    const classes = ImageUploadStyles();
    const [selected, setSelected] = useState('');
    const inputId = title.replace(' ', '-');

    const handleChange = (event) => {
        const fileObj = event.target.files[0];
        setSelected(
            event.target.files.length === 1
                ? fileObj.name
                : fileObj.webkitRelativePath.split('/')[0]);
        onChange(event);
    };

    return (
        <Box>
            <Typography>{title}</Typography>
            <FormControl
                className={classes.fileSelector}
                variant='outlined'
                onChange={handleChange}>

                {type === 'file'
                    ? <input className={classes.input} id={`input-filename-${inputId}`} type='file' />
                    : <input className={classes.input} id={`input-directory-${inputId}`} directory='' webkitdirectory='' type='file' />
                }

                <Box className={classes.buttonBox}>
                    {type === 'file'
                        ? <label htmlFor={`input-filename-${inputId}`}>
                            <Button variant='outlined' component="span" disabled={disabled}>
                                {'SELECT FILE'}
                            </Button></label>
                        : <label htmlFor={`input-directory-${inputId}`}>
                            <Button variant='outlined' component="span" disabled={disabled}>
                                {'SELECT FOLDER'}
                            </Button></label>}
                </Box>

                <Box flexGrow={1} className={classes.textBox}>
                    <Typography>{selected}</Typography>
                </Box>
            </FormControl>
        </Box>
    );
};

export default FileSelectionWidget;