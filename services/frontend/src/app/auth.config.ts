import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://auth.gallifrey.local/auth/realms/master',
  redirectUri: window.location.origin,
  clientId: 'gallifrey',
  scope: 'openid profile email voucher',
  requireHttps: false
};
