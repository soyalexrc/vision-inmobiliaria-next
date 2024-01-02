import React from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import { Navbar, Sidebar, Footer } from '../ui/client';
import Script from 'next/script';

interface ClientLayoutProps {
  title?: string;
  children: JSX.Element;
}

const propertyId = '63bdab1947425128790cb8cf';
const tawkId = '1gmee8ng9';

export function ClientLayout({ title = 'Vision inmobiliaria', children }: ClientLayoutProps) {
  return (
    <Box sx={{ flexFlow: 1, marginTop: 10 }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Sidebar />

      <Box>{children}</Box>
      <Script id="tawk" strategy="lazyOnload">
        {`
                  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                  (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='https://embed.tawk.to/${propertyId}/${tawkId}';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                  })();  
                `}
      </Script>
      <Footer />
    </Box>
  );
}
