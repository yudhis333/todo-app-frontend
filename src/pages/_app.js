// These styles apply to every route in the application
import "../styles/globals.css";
// pages/_app.js

import { Provider } from "react-redux";
import store from "../store/store";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Handle redirect based on path
    if (router.pathname === '/') {
      router.push('/login');
    } else if (router.pathname === '/login') {
      router.push('/login');
    }
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

