import { makeStyles } from '@material-ui/core';

const MainPageStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    leftMenu: {
        width: '20%',
    },
    leftMenuContent: {
        height: '90vh',
        border: '2px solid #e0e0e0',
    },
    imagePreview: {
        width: '70%',
    },
    imagePreviewContent: {
        height: '90vh',
        border: '2px solid #e0e0e0',
    },
    rightMenu: {
        width: '20%',
    },
    rightMenuContent: {
        height: '90vh',
        border: '2px solid #e0e0e0',
    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'row',
        '& button': {
            width: '100%'
        }
    }

});

export default MainPageStyles;