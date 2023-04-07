import React from 'react';

import {
  Box,
  Dialog,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import {UIContext} from "../../../../../context/ui";


export function PreviewFileModal({close, open, data}: any) {
  const {closePreviewModal, isPreviewModal, currentFile} = React.useContext(UIContext)

  console.log(isPreviewModal)

  return (
    <Dialog
      fullScreen
      open={isPreviewModal}
      onClose={closePreviewModal}
      aria-labelledby="responsive-dialog-title"
    >
      <Box display='flex' justifyContent='flex-end' p={2}>
        <IconButton>
          <CloseIcon onClick={closePreviewModal}/>
        </IconButton>
      </Box>

      <Box
        component='img'
        src={`http://100.42.69.119:3000/images/${currentFile}`}
      />

    </Dialog>
  )
}
