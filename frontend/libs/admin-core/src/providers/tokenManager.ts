// Inspired by https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html

import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { fetchClient } from './fetchClient';

const REFRESH_ENDPOINT = '/auth/refresh-token';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const REFRESH_TOKEN_DELAY = 5000; // delay before access token will expire in ms

interface DecodedToken {
  exp: number;
}

export interface TokenData {
  access_token: string;
  refresh_token: string;
}

// TODO: rewrite to class component
const tokenManagerCreator = () => {
  let refreshTimeOutId: number;
  let isRefreshing: Promise<void> | null = null;
  // Can happen on staging server
  let isErrorCookieNotRemoved = false;

  const getTokenExpirationDate = (token: string): Date => {
    try {
      const { exp: expSeconds } = jwtDecode<DecodedToken>(token);
      const expirationMs = expSeconds * 1000;
      return new Date(expirationMs);
    } catch (err) {
      console.error(err);
      const date = new Date();
      date.setDate(date.getDate() + 1);
      // Return date in future to avoid triggering token refresh on invalid token
      return date;
    }
  };

  const getExpirationDelayMs = (token: string): number => {
    const expDate = getTokenExpirationDate(token);
    return expDate.getTime() - Date.now();
  };

  const setSecureCookie = (name: string, value: string) => {
    Cookie.set(name, value, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: getTokenExpirationDate(value),
    });
  };

  const getAccessToken = () => {
    return Cookie.get(ACCESS_TOKEN_KEY);
  };

  const getRefreshToken = () => {
    return Cookie.get(REFRESH_TOKEN_KEY);
  };

  const setAccessToken = (token: string) => {
    setSecureCookie(ACCESS_TOKEN_KEY, token);
  };

  const setRefreshToken = (token: string) => {
    setSecureCookie(REFRESH_TOKEN_KEY, token);
  };

  // The method make a call to the refresh-token endpoint
  // If there is a valid cookie, the endpoint will set a fresh jwt in memory.
  const startTokenRefreshing = () => {
    isRefreshing = fetchClient
      .post<TokenData>(REFRESH_ENDPOINT, {
        refresh_token: getRefreshToken(),
      })
      // Error will be handled in authProvider
      .then(({ data: { access_token, refresh_token } }) => {
        setTokenAndRefreshToken(access_token, refresh_token);
        isRefreshing = null;
      });

    return isRefreshing;
  };

  const waitForTokenRefresh = () => {
    if (isErrorCookieNotRemoved) {
      console.error('Error: Tokens not removed from cookies');
      return Promise.reject();
    }
    if (getAccessToken() || !getRefreshToken()) {
      // resolve immediately when access token exists or refresh token doesn't exist
      return Promise.resolve();
    }
    if (isRefreshing) {
      return isRefreshing.then(() => {
        isRefreshing = null;
      });
    }
    return startTokenRefreshing();
  };

  // This countdown feature is used to renew the JWT before it's no longer valid
  // in a way that is transparent to the user.
  const refreshToken = (delay: number) => {
    refreshTimeOutId = window.setTimeout(
      startTokenRefreshing,
      // Validity period of the token in seconds, minus 5 seconds
      delay - REFRESH_TOKEN_DELAY,
    );
  };

  const abordRefreshToken = () => {
    if (refreshTimeOutId) {
      window.clearTimeout(refreshTimeOutId);
    }
  };

  // Start timer to refresh token
  const startRefreshTimeout = () => {
    // Abort previous refresh timeout
    abordRefreshToken();

    const accessToken = getAccessToken();
    if (accessToken) {
      refreshToken(getExpirationDelayMs(accessToken));
    }
  };

  const setTokenAndRefreshToken = (access_token: string, refresh_token: string) => {
    setAccessToken(access_token);
    setRefreshToken(refresh_token);

    startRefreshTimeout();
  };

  const eraseToken = () => {
    Cookie.remove(ACCESS_TOKEN_KEY);
    Cookie.remove(REFRESH_TOKEN_KEY);

    if (getAccessToken() || getRefreshToken()) {
      isErrorCookieNotRemoved = true;
    }

    abordRefreshToken();
  };

  // Start timeout immediately if token exist
  startRefreshTimeout();

  return {
    eraseToken,
    getToken: getAccessToken,
    setTokenAndRefreshToken,
    waitForTokenRefresh,
  };
};

export const tokenManager = tokenManagerCreator();
