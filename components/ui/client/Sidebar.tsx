import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItem
} from "@mui/material";
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import {UIContext} from "../../../context/ui";

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export function Sidebar() {
  const {sideMenuOpen, closeSideMenu} = React.useContext(UIContext)

  return (
    <Drawer
      anchor='left'
      open={sideMenuOpen}
      onClose={closeSideMenu}
    >
      <Box width={250}>
        <Box sx={{padding: '5px 10px'}}>
          <Typography variant='h4'>Menu</Typography>
        </Box>

        <List>
          {
            menuItems.map((text: string, index: number) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 ? <InboxOutlinedIcon/> : <MailOutlineOutlinedIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={text}/>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>

        <Divider/>
      </Box>
    </Drawer>
  )
}
