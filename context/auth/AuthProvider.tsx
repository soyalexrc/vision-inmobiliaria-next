import React from 'react';
import {AuthContext, authReducer} from "./";
import {User} from '../../interfaces';
import {axiosInstance} from "../../utils";
import Cookie from 'js-cookie'
import {useRouter} from 'next/router';
import {useSnackbar} from "notistack";
import {encryptValue, masterCryptoKey, decryptValue} from '../../utils'

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User ;
  loading: boolean;
}

const AUTH_INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  currentUser: {
    company: '',
    birthday: '',
    city: '',
    email: '',
    first_name: '',
    fiscal_address: '',
    id: 0,
    imageData: null,
    last_name: '',
    password: '',
    phone_number1: '',
    phone_number2: '',
    profession: '',
    sequence: null,
    social_facebook: '',
    social_instagram: '',
    social_twitter: '',
    social_youtube: '',
    state: '',
    user_type: '',
    username: '',
  },
  loading: false
}

export const AuthProvider: React.FC<{children: JSX.Element}> = ({children}) => {
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar()

  const [state, dispatch] = React.useReducer(authReducer, AUTH_INITIAL_STATE)

  const login = async (loginData: {email: string, password: string}) => {
    try {
      dispatch({type: 'Auth - Loading State', payload: true})

      const {data} = await axiosInstance.get(`/user/login?email=${loginData.email}`)
      if (data.recordset.length > 0) {
        const password = encryptValue(masterCryptoKey, loginData.password);
        if (data.recordset[0].password === password) {
          dispatch({type: 'Auth - Login', payload: data?.recordset[0]})
          localStorage.setItem('vi-currentUser', JSON.stringify(data?.recordset[0]))
          localStorage.setItem('vi-token', JSON.stringify(data?.recordset[0]))
          Cookie.set('isAuthenticated', 'true')
          await router.push('/admin')
          await enqueueSnackbar(`Bienvenido/a ${data.recordset[0].username}`, {variant: 'success'})
        }  else {
          enqueueSnackbar('Contraseñas no coinciden...', {variant: 'warning'})
        }
      } else {
        enqueueSnackbar('Usuario no encontrado...', {variant: 'error'})
      }

    } catch (e) {
      console.log(e)
    } finally {
      dispatch({type: 'Auth - Loading State', payload: false})
    }
  }

  const logout = async () => {
    dispatch({type: 'Auth - Logout'})
    await router.push('/autenticacion/login')
    localStorage.removeItem('vi-currentUser')
    localStorage.removeItem('vi-token')
    Cookie.remove('isAuthenticated')
  }



  const providerValue = React.useMemo(() => ({
    ...state,
    login,
    logout
  }), [state])

  React.useEffect(() => {
    dispatch({type: 'Auth - Set User', payload: JSON.parse(localStorage.getItem('vi-currentUser') ?? '{}')})
  }, [])

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
