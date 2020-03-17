import React, { useState, useContext } from 'react';
import ImagePreview from './ImagePreview';
import Box from '@material-ui/core/Box';
import ImageList from './ImageList';
import TagChipsBox from './TagChipBox';
import AnnotationTree from './AnnotationJSONTree';

import { CircularProgress, Button, Checkbox } from '@material-ui/core';
import { AppContext } from '../MainStore';
import { AddCandidateButton, PushButton, PushDatasetButton } from '../Buttons';
import RefreshIcon from '@material-ui/icons/Refresh';


import PushAllModalDialog from './PushAllModalDialog';
import Cookies from 'js-cookie';
import CanvasControls from './CanvasControls';
import MainPageStyles from '../../styles/MainPageStyles';

/*
import tempData from '../tempData/tempData';
import ImageMenu from './ImageMenu';
const sampleImgJPG = 'https://www.loudwallpapers.com/wp-content/uploads/2018/11/close-up-view-of-beach-sand-wallpaper-with-star-fish.jpg';
*/


const MainPage = () => {
  const classes = MainPageStyles();
  const [loading, setLoading] = useState(true);
  const [isOpenedPushAllModalDialog, setIsOpenedPushAllModalDialog] = useState(false);
  const {
    imageTags, syncImageTags,
    annotationsTags, syncAnnotationsTags,
    submitImageData, pushDataset,
    fetchImageList,
    pushCandidate, submitCandidates
  } = useContext(AppContext);

  if (!(Cookies.get('user') && Cookies.get('token'))) {
    Cookies.set('LastUrlForRedirect', window.location.href);
    window.location.replace('/login');
  }

  if (loading) {
    fetchImageList();
    setLoading(false);
  }

  return (
    <div style={{ width: '100%' }}>
      {loading ? <CircularProgress /> :
        <Box p={1} className={classes.root}>
          <Box className={classes.leftMenu}>
            <Box className={classes.leftMenuContent}>
              <TagChipsBox
                title={'IMAGE TAGS'}
                tags={imageTags}
                syncTags={syncImageTags} />
              <ImageList />
            </Box>
            <Box className={classes.buttonBox}>
              <PushDatasetButton handleAction={() => setIsOpenedPushAllModalDialog(true)} />
              <PushAllModalDialog acceptHandle={pushDataset}
                isOpenedPushAllModalDialog={isOpenedPushAllModalDialog}
                setIsOpenedPushAllModalDialog={setIsOpenedPushAllModalDialog} />
            </Box>
          </Box>

          <Box className={classes.imagePreview}>
            <Box className={classes.imagePreviewContent}>
              <ImagePreview />
            </Box>
            <CanvasControls />
          </Box>

          <Box className={classes.rightMenu}>
            <Box className={classes.rightMenuContent}>
              <TagChipsBox
                title={'ANN TAGS'}
                tags={annotationsTags}
                syncTags={syncAnnotationsTags} />
              <AnnotationTree />
            </Box>
            <Box className={classes.buttonBox}>
              <AddCandidateButton handleAction={pushCandidate} />
              <PushButton handleAction={submitCandidates} />
            </Box>

          </Box>

        </Box>
      }
    </div>
  );
};

export default MainPage;