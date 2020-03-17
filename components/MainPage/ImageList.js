import React, {useState, useContext, PureComponent} from 'react';
import {Box, ListItem, ListItemText, makeStyles} from '@material-ui/core';
import {VariableSizeList as List} from 'react-window';
import Typography from '@material-ui/core/Typography';
import {AppContext} from '../MainStore';
import ImageListStyles from '../../styles/ImageListStyles';
import AutoSizer from 'react-virtualized-auto-sizer';


const ImageList = () => {
  const classes = ImageListStyles();
  const {
    imageList, fetchImageData,
    currentImg, setCurrentImg,
    validatedImgList, conflictedImgList
  } = useContext(AppContext);
  {
    imageList[0] && !currentImg && setCurrentImg(imageList[0]);
  }

  const handleListItemClick = (event) => {
    let imageName = event.target.textContent;
    setCurrentImg(imageName);
    fetchImageData(imageName);
  };

  class ItemRenderer extends PureComponent {
    render() {
      const item = this.props.data[this.props.index];
      let _style = {
        paddingLeft: 10
      };
      if (conflictedImgList.includes(item)) {
        _style['backgroundColor'] = 'rgba(255, 0, 0, 0.4)';
      }
      if (validatedImgList.includes(item)) {
        _style['backgroundColor'] = 'rgba(0, 255, 0, 0.4)';
      }
      return (
        <ListItem button divider disableGutters
                  selected={item === currentImg}
                  onClick={handleListItemClick}
                  style={_style}
        >
          {item}
        </ListItem>
      );
    }
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography>
          {'IMAGES'}
        </Typography>
      </Box>

      <Box className={classes.imageListWrapper}>
        <AutoSizer>
          {({height, width}) => (
            <List
              height={height}
              itemCount={imageList.length}
              itemData={imageList}
              itemSize={(index) => {
                return 25;
              }}
              width={width}>

              {ItemRenderer}

            </List>
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

export default ImageList;

