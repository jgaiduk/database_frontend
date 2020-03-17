import { makeStyles } from '@material-ui/core';

const AnnotJSONTreeStyles = makeStyles({
    root: {
        margin: 5,
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
    tree: {
        display: 'flex',
        maxHeight: '70vh',
        overflow: 'scroll'
    },
});

export default AnnotJSONTreeStyles;
