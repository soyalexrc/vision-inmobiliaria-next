import React from 'react';
import {Autocomplete, Box, Button, Divider, Drawer, Grid, IconButton, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

interface FilterDrawerProps {
  open: boolean
  closeAction: () => void
  children: JSX.Element
  direction?: DrawerDirection
}

type DrawerDirection = 'right' | 'left' | 'bottom' | 'top'

export function FilterDrawer(
  {open, closeAction, children, direction = 'right' }: FilterDrawerProps
) {
  return (
    <Drawer
      anchor={direction}
      open={open}
      onClose={closeAction}
    >
      {children}
    </Drawer>
  )
}
