import React from 'react';
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ConfirmationContext} from "../../../context/confirmation";
import {ModalContent} from "../../../interfaces";

export function  DeleteButton(props: ModalContent) {
const {toggleModal} = React.useContext(ConfirmationContext)

  const handleOnClick = async () => {
    const result = await toggleModal(props.title,  props.element);
    result && props.onClick!();
  };

  return (
    <IconButton onClick={handleOnClick}>
      <DeleteIcon />
    </IconButton>
  )
};

