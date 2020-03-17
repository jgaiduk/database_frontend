import { makeStyles } from '@material-ui/core';

const ImageListStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh',
        minHeight: '80vh',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        '& p': {
            fontSize: 24,
            margin: 5,
            paddingLeft: 3,
        }
    },
    imageListWrapper: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        minHeight: '75vh'
    },
});

export default ImageListStyles;
