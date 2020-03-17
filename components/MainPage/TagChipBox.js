import React, { useState } from 'react';
import _ from 'lodash';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputFieldWithControls from './InputFieldWithControls';
import { UndoIconButton, RestoreIconButton, AddTextFieldIconButton } from '../Buttons';

const useStyles = makeStyles({
  root: {
    margin: 5,
    maxHeight: '10vh',
    minHeight: '10vh',
    overflow: 'scroll'
  },
  chip: {
    margin: 2,
    fontSize: 18
  },
  button: {
    marginBottom: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      fontSize: 24,
      margin: 5,
      paddingLeft: 3,
    }
  },
});

const TagChipsBox = ({ title, tags, syncTags }) => {
  const classes = useStyles();
  const [history, updateHistory] = useState([]);
  const [editingOn, toggleEditing] = useState(false);

  const handleDelete = chipToDelete => () => {
    updateHistory([...history, tags]);
    let newTags = tags.filter(tag => tag != chipToDelete);
    syncTags(newTags);
  };
  const handleUndo = () => {
    if (history.length > 0) {
      const latestSnapshot = history.pop();
      syncTags(latestSnapshot);
    } else { return; }
  };
  const handleRestore = () => {
    if (history.length > 0) {
      const originalState = history[0];
      syncTags(originalState);
      updateHistory([]);
    } else { return; }
  };
  const handleSave = (v) => {
    if (v.length > 0) {
      let newTags = [...tags, v];
      syncTags(newTags);
    }
    toggleEditing(false);
  };

  const inputFieldBox = InputFieldWithControls({
    onSaveClick: handleSave,
    onCancelClick: () => { toggleEditing(false); }
  });
  return (
    <div className={classes.root}>

      <Box className={classes.header}>
        <Box flexGrow={1}>
          <Typography>
            {title}
          </Typography>
        </Box>

        <Box>
          <AddTextFieldIconButton handleAction={() => toggleEditing(true)} />
          <UndoIconButton handleUndo={handleUndo} />
          <RestoreIconButton handleRestore={handleRestore} />
        </Box>
      </Box>
      {editingOn ? inputFieldBox : ''}
      {tags.map(tag => {
        return (
          <Chip
            className={classes.chip}
            key={tag}
            label={tag}
            onDelete={handleDelete(tag)}
          />
        );
      })}
    </div>
  );
};

export default TagChipsBox;