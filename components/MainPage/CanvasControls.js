import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { Box, Button, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { AppContext } from '../MainStore';
import MainPageStyles from '../../styles/MainPageStyles';

const CanvasControls = () => {
    const classes = MainPageStyles();
    const { annotationTypesVisibility,
        syncAnnotationsVisibility } = useContext(AppContext);
    const [options, updateOptions] = useState(null);
    if (!options && !_.isEmpty(annotationTypesVisibility)) { updateOptions(annotationTypesVisibility); }

    const handleCheck = name => e => {
        console.log('handleCheck placeholder', 'name', name, 'e.target', e.target.value);
        const newOptions = { ...options, [name]: !options[name] };
        updateOptions(newOptions);
    };
    const handleRefreshClick = () => {
        syncAnnotationsVisibility(options);
    };

    return (
        <Box className={classes.buttonBox}>
            <Box className={classes.checksBox}>
                <FormGroup row>
                    {options && Object.entries(options).map((op, i) => {
                        const [k, v] = op;
                        return (
                            <FormControlLabel control={
                                <Checkbox
                                    id={`${k}`}
                                    color='primary'
                                    checked={options[k]}
                                    value={options[k]}
                                    onChange={handleCheck(k)} />}
                                label={k} />);
                    })}
                </FormGroup>
            </Box>
            <Box flexGrow={1}>
                <Button
                    variant='outlined' onClick={handleRefreshClick}>
                    {'refresh canvas'}
                </Button>
            </Box>
        </Box>
    );
};

export default CanvasControls;