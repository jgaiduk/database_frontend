import React, { useState, useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import ReactJson from 'react-json-view';
import { AppContext } from '../MainStore';
import { UndoIconButton, RestoreIconButton } from '../Buttons';
import AnnotJSONTreeStyles from '../../styles/AnnotJSONTreeStyles';


const AnnotationTree = () => {
  const classes = AnnotJSONTreeStyles();
  const { annotations, syncAnnotations, imageInfo, setImageInfo } = useContext(AppContext);
  const [history, updateHistory] = useState();

  const handleUndo = () => {
    let latestSnapshot = history.pop();
    setImageInfo(latestSnapshot.image_info);
    syncAnnotations(latestSnapshot.annotations);
    syncAnnotations(latestSnapshot);
  };
  const handleRestore = () => {
    let originalState = history[0];
    setImageInfo(originalState.image_info);
    syncAnnotations(originalState.annotations);
    updateHistory([]);
  };
  const handleChange = (ev) => {
    let newSnapshot = ev.updated_src;
    setImageInfo(newSnapshot.image_info);
    syncAnnotations(newSnapshot.annotations);
    updateHistory([...history, newSnapshot]);
  };
  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Box flexGrow={1}>
          <Typography>
            {'ANNOTATIONS'}
          </Typography>
        </Box>

        <Box>
          <UndoIconButton handleUndo={handleUndo} />
          <RestoreIconButton handleRestore={handleRestore} />
        </Box>
      </Box>
      <Box className={classes.tree}>
        <ReactJson
          src={
            {
              'image_info': imageInfo,
              'annotations': annotations
            }
          }
          indentWidth={2}
          iconStyle={'triangle'}
          displayDataTypes={false}
          displayObjectSize={false}
          onEdit={handleChange}
          onDelete={handleChange}
          onAdd={handleChange}
          enableClipboard={false}
          style={{ fontSize: 16 }} />
      </Box>
    </div>
  );
};

export default AnnotationTree;



