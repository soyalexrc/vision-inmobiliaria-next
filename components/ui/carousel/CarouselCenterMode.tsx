import React from 'react';
import Slider from 'react-slick';
// import Image from 'next/image'
// material
import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, Typography } from '@mui/material';
// utils
import { CarouselControlsPagingBelow } from './controls';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:before, &:after': {
    top: 0,
    left: 0,
    zIndex: 8,
    width: 48,
    content: "''",
    height: '100%',
    display: 'none',
    position: 'absolute',
    [theme.breakpoints.up(480)]: {
      display: 'block',
    },
  },
  '&:after': {
    right: 0,
    left: 'auto',
    transform: 'scaleX(-1)',
  },
  '& .slick-track': {
    display: 'inline-flex',
  },
  '& .slick-arrow': {
    display: 'none !important',
  },
}));

// ----------------------------------------------------------------------

function CustomArrow({ onClick, side }: any) {
  return (
    <IconButton
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        backgroundColor: 'primary.main',
        top: '40%',
        ...(side === 'left' && {
          left: 0,
        }),
        ...(side === 'right' && {
          right: 0,
        }),
        zIndex: 999,
      }}
      onClick={onClick}
    >
      {side === 'left' && <ArrowBackIosIcon sx={{ color: '#fff' }} />}
      {side === 'right' && <ArrowForwardIosIcon sx={{ color: '#fff' }} />}
    </IconButton>
  );
}

function CarouselItem({ item }: any) {
  const router = useRouter();

  return (
    // <Box sx={{position: 'relative', mx: 1, cursor: 'grab', width: 300, height: 300, px: 2}} >
    <Box sx={{ position: 'relative', mx: 1, cursor: 'grab' }}>
      {/*<Image*/}
      {/*  src={item.img}*/}
      {/*  alt={item.label}*/}
      {/*  fill*/}
      {/*/>*/}
      <Box component="img" width="100%" height="300px" sx={{ objectFit: 'cover' }} src={item.img} />
      <Box sx={{ p: 1, position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#08222094' }}>
        <Typography align="center" color="#ffff" variant="h5">
          {item.label}
        </Typography>
        <Box display="flex" justifyContent="center" mt={1}>
          <Button
            onClick={() => router.push(item.path)}
            size="small"
            sx={{ backgroundColor: '#fff', height: '20px', fontSize: '11px', '&:hover': { color: '#fff' } }}
          >
            Ver mas
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function CarouselCenterMode({ data }: any) {
  const settings = {
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <CustomArrow onClick={() => console.log('side')} side="right" />,
    prevArrow: <CustomArrow onClick={() => console.log('side')} side="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
    ...CarouselControlsPagingBelow({ sx: { mt: 3 } }),
  };

  return (
    <RootStyle>
      <Slider {...settings}>
        {data.map((item: any, index: number) => (
          <CarouselItem item={item} key={index + 1} />
        ))}
      </Slider>
    </RootStyle>
  );
}
