import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {lightTheme} from "../../themes";
import {UIProvider} from "../../context/ui";
import {SnackbarProvider} from 'notistack';
import {AuthProvider} from "../../context/auth";
import {ConfirmationProvider} from "../../context/confirmation";
import Script from "next/script";

import {Inter} from '@next/font/google'

const propertyId = '63bdab1947425128790cb8cf';
const tawkId = '1gmee8ng9';

const inter = Inter({
  subsets: ['latin']
})

export default function App({Component, pageProps}: AppProps) {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <ConfirmationProvider>
        <AuthProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline/>
                <main className={inter.className}>
                <Component {...pageProps} />
                </main>
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
            </ThemeProvider>
          </UIProvider>
        </AuthProvider>
      </ConfirmationProvider>
    </SnackbarProvider>

  )
}
