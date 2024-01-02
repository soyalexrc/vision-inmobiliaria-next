import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Link, Box, Container, styled, useMediaQuery } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../../context/ui';
import NextLink from 'next/link';
import styles from '@/styles/navbar.module.css';
import { MENU_ITEMS, MenuElement, MenuChild, SOCIAL_MEDIA_DATA } from '../../../utils/mock-data';
import { SystemProps, Theme } from '@mui/system';
import { useRouter } from 'next/router';
import { TikTokIcon } from './index';
import Image from 'next/image';

const LinkItem = styled(Box)(({ _ }: SystemProps<Theme> | any) => ({
  color: 'black',
  height: '100%',
  margin: '0 1rem',
  cursor: 'pointer',
  transition: 'color 200ms ease, border 200ms ease',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '3px solid transparent',
  '&:hover': {
    color: '#610321',
    borderBottomColor: '#610321',
  },
}));

const LinkChildItem = styled(Box)(({ _ }: SystemProps<Theme> | any) => ({
  color: 'black',
  padding: '12px 16px',
  transition: 'background 200ms ease, color 200ms ease',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'block',
  '&:hover': {
    backgroundColor: '#ddd',
    color: '#610321',
  },
}));

export function Navbar() {
  const router = useRouter();
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const { openSideMenu } = React.useContext(UIContext);

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

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fff' }}>
      <Box sx={{ backgroundColor: 'primary.light' }}>
        <Container>
          <Box display="flex" sx={{ padding: '2px' }} justifyContent="flex-end">
            <Link href="https://www.tiktok.com/@somosvisioninmobiliaria" target="_blank" style={{ margin: '0 1rem' }}>
              <TikTokIcon color="#610321" sx={{ width: 25, height: 25 }} />
            </Link>
            {SOCIAL_MEDIA_DATA.map((element, index) => (
              <Link href={element.path} target="_blank" key={element.path + index} style={{ margin: '0 1rem' }}>
                {element.icon}
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', mr: largeScreen ? 4 : 2 }}>
        <Box display="flex" alignItems="center">
          <NextLink href="/" style={{ height: 60 }}>
            <Image width={160} height={60} alt="Vision inmobiliaria logo" src="/icons/vision-logo.png" style={{ objectFit: 'cover' }} />
          </NextLink>
        </Box>
        {!largeScreen && (
          <IconButton onClick={openSideMenu} size="large" edge="start">
            <MenuOutlinedIcon />
          </IconButton>
        )}

        {largeScreen && (
          <Box display="flex" height="65px">
            {MENU_ITEMS.map((link, index) => {
              if (!link.children) {
                return (
                  <NextLink style={{ textDecoration: 'none' }} key={link.id} href={link.path!}>
                    <LinkItem
                      className={styles.dropdown}
                      sx={{
                        ...(handleMatchPath(link) && {
                          color: '#610321',
                          borderBottomColor: '#610321',
                          fontWeight: 'bold',
                        }),
                      }}
                    >
                      {link.label}
                    </LinkItem>
                  </NextLink>
                );
              } else {
                return (
                  <LinkItem
                    key={link.id}
                    className={styles.dropdown}
                    sx={{
                      ...(handleMatchPath(link) && {
                        color: '#610321',
                        borderBottomColor: '#610321',
                        fontWeight: 'bold',
                      }),
                    }}
                  >
                    {link.label}
                    <div className={styles.dropdownContent}>
                      {link.children.map((child) => (
                        <NextLink href={child.path!} key={child.id}>
                          <LinkChildItem
                            sx={{
                              ...(handleMatchSubPath(child)
                                ? {
                                    color: '#610321 !important',
                                    fontWeight: 'bold',
                                    backgroundColor: '#ddd',
                                  }
                                : {
                                    fontWeight: 'regular',
                                  }),
                            }}
                          >
                            {child.label}
                          </LinkChildItem>
                        </NextLink>
                      ))}
                    </div>
                  </LinkItem>
                );
              }
            })}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
