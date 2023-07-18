import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {lightTheme} from "../../themes";
import {UIProvider} from "../../context/ui";
import {SnackbarProvider} from 'notistack';
import {AuthProvider} from "../../context/auth";
import {ConfirmationProvider} from "../../context/confirmation";
import Script from "next/script";

// import {Inter} from '@next/font/google'



// const inter = Inter({
//   subsets: ['latin']
// })

export default function App({Component, pageProps}: AppProps) {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <ConfirmationProvider>
        <AuthProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline/>
                {/*<main className={inter.className}>*/}
                <Component {...pageProps} />
                {/*</main>*/}
            </ThemeProvider>
          </UIProvider>
        </AuthProvider>
      </ConfirmationProvider>
    </SnackbarProvider>

  )
}
