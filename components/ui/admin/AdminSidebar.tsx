import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  Collapse,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import {styled} from '@mui/material/styles';
import {UIContext} from "../../../context/ui";
import {AuthContext} from "../../../context/auth";
import {ADMIN_MENU_ITEMS} from '../../../utils/mock-data'
import {useRouter} from "next/router";



const DrawerHeader = styled('div')(({theme}: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export function AdminSidebar() {
  const router = useRouter()
  const {adminMenuOpen, closeAdminMenu, adminPanelOpen, setAdminPanelName} = React.useContext(UIContext)
  const {currentUser} = React.useContext(AuthContext)
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  return (
    <Drawer
      variant={largeScreen ? 'permanent' : 'temporary'}
      anchor='left'
      open={adminMenuOpen}
      onClose={closeAdminMenu}
      sx={{
        width: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          // backgroundColor: theme => theme.palette.primary.main,
          backgroundImage: `url('/images/sidebar-5.jpg')`,
          backgroundRepeat: 'no-repeat',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          '& ::after': {
            content: '""',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'primary.main',
            // backgroundColor: 'black',
            opacity: 0.05,
            zIndex: -11
          },
          width: 301,
          boxSizing: 'border-box',
        },
      }}
    >
      <DrawerHeader
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '1.5rem 2rem'}}>
        <Box
          mr={2}
          component='img'
          onError={({currentTarget}) => {
            currentTarget.onerror = null;
            currentTarget.src = '/images/no-image.jpg'
          }}
          src={currentUser.image ? currentUser.image : '/images/no-image.jpg'}
          width={40}
          height={40}
          sx={{borderRadius: 100}}
        />
        <Box>
          <Typography variant='h5' color='#fff'>{currentUser?.first_name} </Typography>
          <Typography color='#fff'>{currentUser?.user_type}</Typography>
        </Box>
      </DrawerHeader>
          {
            ADMIN_MENU_ITEMS.filter(x => x.roles?.includes(currentUser?.user_type)).map((route) => {
              if (!route.children) {
                return (
                  <Box
                    onClick={() => router.push(route.path!)}
                    key={route.id}
                    sx={{
                      cursor: 'pointer',
                      minHeight: 48,
                      display: 'flex',
                      color: 'white',
                      justifyContent: 'initial',
                      backgroundColor: router.pathname === route.path ? 'rgba(255,255,255, 0.1)' : 'transparent',
                      "&:hover": {
                        backgroundColor: 'rgba(255,255,255, 0.1)',
                      },
                      p: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        mr: 3,
                        justifyContent: 'center',
                      }}
                    >
                      {route.icon}
                    </Box>
                    <Typography> {route.title}</Typography>
                  </Box>
                )
              } else {
                return (
                  <>
                    <Box
                      onClick={() => setAdminPanelName(route.value)}
                      key={route.id}
                      sx={{
                        cursor: 'pointer',
                        minHeight: 48,
                        display: 'flex',
                        color: 'white',
                        justifyContent: 'space-between',
                        backgroundColor:  adminPanelOpen === route.value ? 'rgba(255,255,255, 0.1)' : 'transparent',
                        "&:hover": {
                          backgroundColor: 'rgba(255,255,255, 0.1)',
                        },
                        p: 2.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {route.icon}
                      <Typography sx={{ ml: 3 }}> {route.title}</Typography>
                      </Box>
                      {adminPanelOpen === route.value ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                    <Collapse in={adminPanelOpen === route.value} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {
                          route.children.map(child => (
                            <ListItemButton
                              key={child.id}
                              sx={{
                                pl: 4,
                                backgroundColor: router.pathname.includes(child.path!)  ? 'rgba(255,255,255, 0.1)' : 'transparent',
                                "&:hover": {
                                  backgroundColor: 'rgba(255,255,255, 0.1)',
                                },
                                py: 2
                            }}
                              onClick={() => router.push(child.path)}
                            >
                              <ListItemIcon>
                                <CircleIcon sx={{ color: '#fff', fontSize: '10px' }} />
                              </ListItemIcon>
                              <ListItemText sx={{ color: '#fff' }} primary={child.title} />
                            </ListItemButton>
                          ))
                        }
                      </List>
                    </Collapse>
                  </>
                )
              }
            })
          }

        <Divider/>
    </Drawer>
  )
}
