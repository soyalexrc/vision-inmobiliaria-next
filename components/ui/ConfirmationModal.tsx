import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  title: string;
  text?: string;
  confirmText: string;
  cancelText: string;
  action: (action: string) => void;
  open: boolean;
}

export default function ConfirmationModal(props: Props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.action('cancel')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.action('cancel')}>{props.cancelText}</Button>
          <Button color="primary" onClick={() => props.action('confirm')} autoFocus>
            {props.confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
