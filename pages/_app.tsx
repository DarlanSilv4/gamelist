import { useEffect } from "react";

import type { AppProps } from "next/app";
import Router from "next/router";

import AuthProvider from "@contexts/AuthContext";

import NProgress from "nprogress";

import GlobalStyle from "globalStyles";
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }: AppProps) {
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <AuthProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
