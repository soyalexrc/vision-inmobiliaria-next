// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  justifyContent: 'center',
  zIndex: 9,
  position: 'absolute',
  bottom: 24,
  right: 0,
  width: '100%',
  '& li': {
    width: 24,
    height: 24,
    opacity: 0.32,
    cursor: 'pointer',
    '&.slick-active': {
      opacity: 1,
      '& .dotActive': {
        width: 18,
        borderRadius: 8,
      },
    },
  },
});

const DotStyle = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.easeInOut,
    duration: 360,
  }),
}));

// ----------------------------------------------------------------------

interface CarouselControlsPaging2Props {
  color?: string;
  sx: any;
}

export default function CarouselControlsPaging2({ color, sx }: CarouselControlsPaging2Props) {
  return {
    appendDots: (dots: any) => (
      <>
        <RootStyle sx={sx}>{dots}</RootStyle>
      </>
    ),
    customPaging: () => (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DotStyle
          className="dotActive"
          sx={{
            bgcolor: color || 'primary.main',
          }}
        />
      </Box>
    ),
  };
}
