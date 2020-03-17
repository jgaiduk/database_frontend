import React from 'react';
import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ImageUploadStyles from '../styles/ImageUploadStyles';


const DatasetSelector = ({ datasets, handler, current }) => {
    const classes = ImageUploadStyles();
    return (
        <Box className={classes.typeSelector}>
            <FormControl
                variant='outlined'>
                <InputLabel>DATASET TYPE</InputLabel>
                <Select
                    labelWidth={124}
                    value={current}
                    onChange={handler}>
                    {datasets.map((dataset) => {
                        return (
                            <MenuItem value={dataset}>
                                {dataset.schema.title}
                            </MenuItem>);
                    })}
                </Select>
            </FormControl>
        </Box>
    );
};

export default DatasetSelector;