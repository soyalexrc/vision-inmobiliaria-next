import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Card, Typography, CardContent } from '@mui/material';
// utils
//
import { CarouselControlsArrowsIndex } from './controls';

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
};

function CarouselItem({ item }: any) {
  const { image, title, description } = item;

  return (
    <>
      <Box component="img" alt={title} src={image} sx={{ width: '100%', height: 370, objectFit: 'cover' }} />

      <CardContent sx={{ textAlign: 'left' }}>
        <Typography variant="h6" noWrap gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </CardContent>
    </>
  );
}

export default function CarouselBasic2() {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, _] = useState(2);

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentIndex,
    fade: Boolean(theme.direction !== 'rtl'),
    rtl: Boolean(theme.direction === 'rtl'),
    // beforeChange: (current, next) => setCurrentIndex(next)
  };

  const handlePrevious = () => {
    // @ts-ignore
    carouselRef?.current?.slickPrev();
  };

  const handleNext = () => {
    // @ts-ignore
    carouselRef?.current?.slickNext();
  };

  return (
    <Card>
      <Slider {...settings}>
        {[].map((item: any) => (
          // <CarouselItem key={item.title} item={item} />
          <Box key={item}>
            <Box component="img" src={item.image} />
          </Box>
        ))}
      </Slider>

      <CarouselControlsArrowsIndex
        index={currentIndex}
        total={[].length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{ bottom: 120 }}
      />
    </Card>
  );
}
