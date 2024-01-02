import React from 'react';
import { AppBar, Toolbar, IconButton, Box, useMediaQuery, Badge, Menu, MenuItem } from '@mui/material';
import { MENU_ITEMS, MenuChild, MenuElement } from '../../../utils/mock-data';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

import NextLink from 'next/link';
import Image from 'next/image';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import styles from '@/styles/navbar.module.css';
import { useRouter } from 'next/router';
import { UIContext } from '../../../context/ui';
import { SystemProps, Theme } from '@mui/system';
import { SearchInput } from './';
import { AuthContext } from '../../../context/auth';

export function AdminNavbar() {
  const router = useRouter();
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const { openAdminMenu } = React.useContext(UIContext);
  const { logout } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMatchPath = (link: MenuElement): boolean => {
    const partialRoute = router.asPath.split('/')[1];
    if (link.path === '/') {
      return router.pathname === link.path;
    }
    return partialRoute === link.path!.split('/')[1] || router.pathname === link.path;
  };

  const handleMatchSubPath = (link: MenuChild): boolean => {
    return router.asPath === link.path;
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Mi cuenta</MenuItem>
      <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center" sx={{ paddingLeft: largeScreen ? '300px' : '0px' }}>
          {!largeScreen && (
            <IconButton onClick={openAdminMenu} size="large" edge="start">
              <MenuOutlinedIcon sx={{ color: '#fff' }} />
            </IconButton>
          )}
          <SearchInput />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon sx={{ color: '#fff' }} />
            </Badge>
          </IconButton>
          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon sx={{ color: '#fff' }} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle sx={{ color: '#fff' }} />
          </IconButton>
        </Box>
        {renderMenu}
      </Toolbar>
    </AppBar>
  );
}
