import Slider from "react-slick";
import {useRef} from "react";
// material
import {styled, useTheme} from "@mui/material/styles";
import {Box, IconButton, useMediaQuery} from "@mui/material";
// utils
//
import {CarouselControlsPaging2,} from "./controls";
import {useRouter} from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from "next/image";

// ----------------------------------------------------------------------

interface RootStyleProps {
  theme?: any,
  show?: boolean
}

const RootStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'show',
})(({theme, show}: RootStyleProps) => ({}));


// ----------------------------------------------------------------------

interface CarouselItemProps {
  item: any,
}

function CarouselItem({item}: CarouselItemProps) {
  const router = useRouter();
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))


  function goTo(url: string) {
    if (url.includes('http')) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      return router.push(url);
    }
  }

  if (largeScreen) {
    return (
      <Box height='700px' width='100%'>
        <Image
          alt={item.alt}
          fill={true}
          priority={true}
          src='/images/banners/mainbanner-1.jpg'
        />
      </Box>
      // <Box
      //   // onClick={() => goTo(item.url)}
      //   component='img'
      //   alt={item.alt}
      //   width='100%'
      //   height='100%'
      //   sx={{ width: '100%', height: '600px', objectFit: 'cover', marginBottom: '-6px'}}
      //   src={item.image}
      // />
    )
  } else {
    return (
      <Box
        // onClick={() => goTo(item.url)}
        component='img'
        width='100%'
        height='100%'
        alt={item.alt}
        sx={{width: '100%', height: '100%', objectFit: 'cover'}}
        src={item.image}
      />
    )
  }
}

function CarouselProductDetail({item}: any) {
  return (
    <Box
      component='img'
      loading='lazy'
      alt={item.alt}
      sx={{width: '100%', height: {xs: '100%', md: '600'}, objectFit: 'contain'}}
      src={item.image}
    />
  )
}

function CustomArrow({onClick, side}: any) {
  return (
    <IconButton
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        ...(side === 'left' && {
          left: 0
        }),
        ...(side === 'right' && {
          right: 0
        }),
        zIndex: 999,
        mx: 2,
      }}
      onClick={onClick}
    >
      {side === 'left' && <ArrowBackIosIcon sx={{color: '#fff'}}/>}
      {side === 'right' && <ArrowForwardIosIcon sx={{color: '#fff'}}/>}
    </IconButton>
  )
}

export default function CarouselBasic3({items, type, showArrows, showDots, styles}: any) {
  const theme = useTheme();
  const carouselRef = useRef();

  const handlePrevious = () => {
    // @ts-ignore
    carouselRef?.current?.slickPrev();
  };

  const handleNext = () => {
    // @ts-ignore
    carouselRef?.current?.slickNext();
  };

  const settings = {
    dots: showDots,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: showArrows,
    slidesToShow: 1,
    nextArrow: <CustomArrow onClick={() => handlePrevious()} side='left'/>,
    prevArrow: <CustomArrow onClick={() => handleNext()} side='right'/>,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === "rtl"),
    ...CarouselControlsPaging2({
      sx: {mt: 3},
    }),
  };

  // @ts-ignore
  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        "&:before, &:after": {
          ...(showArrows && {
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
          }),
          top: 0,
          left: 0,
          zIndex: 8,
          width: 70,
          content: "''",
          height: "100%",
          display: "none",
          position: "absolute",
          [theme.breakpoints.up(480)]: {
            display: "block",
          },
        },
        "&:after": {
          right: 0,
          left: "auto",
          transform: "scaleX(-1)",
        },
        "& .slick-track": {
          display: "inline-flex",
        },
        "& .slick-arrow": {
          display: "none !important",
        },
      }}
    >
      {
        type === 'banner' &&
        <Slider {...settings}>
          {items.map((item: any, index: number) => (
            <CarouselItem key={index} item={item}/>
          ))}
        </Slider>
      }
      {
        type === 'product' &&
        <Slider  {...settings}>
          {items.map((item: any, i: number) => (
            <CarouselProductDetail key={item._id} index={i} item={item}/>
          ))}
        </Slider>
      }
    </Box>
  );
}
