import React from 'react';
import UndoIcon from '@material-ui/icons/Undo';
import RestoreIcon from '@material-ui/icons/Restore';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


const ButtonRaw = ({ name, handleAction }) => {
    const handle = () => {
        if (handleAction) { handleAction(); }
        else { console.log(`clicked ${name}, no handler specified`); }
    };
    return (<Button variant='outlined' onClick={handle}> {name} </Button>);
};

const VerifyButton = ({ handleAction }) => {
    return (<ButtonRaw name={'PUSH'} handleAction={handleAction} />);
};

const AddCandidateButton = ({ handleAction }) => {
    return (<ButtonRaw name={'ADD'} handleAction={handleAction} />);
};

const PushDatasetButton = ({ handleAction }) => {
    return (<ButtonRaw name={'PUSH ALL'} handleAction={handleAction} />);
};

const UndoIconButton = ({ handleUndo }) => {
    return (
        <IconButton
            size='small'
            onClick={handleUndo}>
            <UndoIcon />
        </IconButton>
    );
};

const RestoreIconButton = ({ handleRestore }) => {
    return (
        <IconButton
            size='small'
            onClick={handleRestore}>
            <RestoreIcon />
        </IconButton>
    );
};

const AddTextFieldIconButton = ({ handleAction }) => {
    return (
        <IconButton
            size='small'
            onClick={handleAction}>
            <AddBoxOutlinedIcon />
        </IconButton>
    );
};




export {
    VerifyButton as PushButton, PushDatasetButton, AddCandidateButton,
    UndoIconButton, RestoreIconButton,
    AddTextFieldIconButton
};

