import {ClientLayout} from 'components/layouts';
import {CarouselBasic3} from "../../components/ui/carousel";
import {Searcher, LifestyleBanner, ContactBanner, LatestElements, OurServices, Advisers} from "../../components/ui/client";

const mainData = [
  {
    url: '',
    alt: '',
    image: '/images/banners/mainbanner-1.jpg'
  }
]

export default function Home() {
  return (
    <ClientLayout title='Vision Inmobiliaria - Home'>
      <>
        <CarouselBasic3 items={mainData} type='banner' showArrows={false} showDots={false} />
        <Searcher />
        <LifestyleBanner />
        <ContactBanner />
        <LatestElements />
        <OurServices />
        <Advisers />
      </>
    </ClientLayout>
  )
}
