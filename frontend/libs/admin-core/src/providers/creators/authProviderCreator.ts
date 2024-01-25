import { AuthProvider } from 'react-admin';
import { AxiosError } from 'axios';
import { fetchClient } from '../fetchClient';
import { tokenManager, TokenData } from '../tokenManager';

export interface AuthProviderCreatorProps {
  executeRecaptcha?: (page?: string) => string;
  recaptchaTokenKey?: string;
}

export type AuthProviderCreator = (props?: AuthProviderCreatorProps) => AuthProvider;

export const authProviderCreator: AuthProviderCreator = ({
  executeRecaptcha,
  recaptchaTokenKey = 'g-recaptcha-response',
} = {}) => {
  return {
    login: async ({ username, password }) => {
      let googleToken = '';
      try {
        if (executeRecaptcha) {
          googleToken = await executeRecaptcha('login_page');
        }
      } catch (err) {
        // react-admin doesn't expect 'null' as error and executeRecaptcha() can return it
        throw Error(err && typeof err === 'string' ? err : `Internal error: executing recaptcha`);
      }
      return fetchClient
        .post<TokenData>('/login', {
          email: username,
          password,
          ...(executeRecaptcha ? { [recaptchaTokenKey]: googleToken } : {}),
        })
        .then(({ data: { access_token, refresh_token } }) => {
          tokenManager.setTokenAndRefreshToken(access_token, refresh_token);
        });
    },

    logout: () => {
      tokenManager.eraseToken();
      // Invalidate token on backend
      fetchClient.post('/logout');
      return Promise.resolve();
    },

    checkAuth: () => {
      return tokenManager.waitForTokenRefresh().then(() => {
        return tokenManager.getToken() ? Promise.resolve() : Promise.reject();
      });
    },

    checkError: (error: AxiosError) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        tokenManager.eraseToken();
        return Promise.reject();
      }
      return Promise.resolve();
    },

    getPermissions: () => {
      return tokenManager.waitForTokenRefresh().then(() => {
        return tokenManager.getToken() ? Promise.resolve() : Promise.reject();
      });
    },
  };
};
