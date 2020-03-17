import React, {useState} from 'react';
import MenuBar from './MenuBar';
import Box from '@material-ui/core/Box';

const BaseLayout = ({pageTitle, children}) => {
  return (
    <div style={{width: '100%'}}>
      <Box display='flex'>
        <MenuBar pageTitle={pageTitle}/>
      </Box>
      <Box>
        {children}
      </Box>
    </div>
  );
};

export default BaseLayout;
