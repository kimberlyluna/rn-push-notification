import { useState, useEffect } from 'react';

import {
  createConfig,
  EventEmitter,
  isAuthenticated,
  getUser,
  getAccessToken,
} from '@okta/okta-react-native';

export const useOktaAccessToken = () => {

} 

export const useOktaAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const initClient = async () => {
    await createConfig({
      issuer: "<issuer-url>/oauth2/default",
      clientId: "<client-id>",
      redirectUri: "<redirect-uri>",
      endSessionRedirectUri: "<end-session-redirect-uri>",
      discoveryUri: "<app-url>/oauth2/default",
      scopes: ["openid", "profile", "offline_access"],
      requireHardwareBackedKeyStore: false
    });
  };

  const isLoggedIn = async () => {
    const {authenticated: authState} = await isAuthenticated();
    if (authState !== authenticated) {
      setAuthenticated(authState)
    }
  };

  const getUserData = async () => {
    const user = await getUser()
    setUser(user);
  };

  useEffect(() => {
    EventEmitter.addListener('signInSuccess', function(e) {
      setAuthenticated(true)
    });

    EventEmitter.addListener('signOutSuccess', function(e) {
      setAuthenticated(false)
    });
    initClient();
    isLoggedIn();
    return () => {
      EventEmitter.removeAllListeners('signInSuccess')
      EventEmitter.removeAllListeners('signOutSuccess')
      EventEmitter.removeAllListeners('onError')
      EventEmitter.removeAllListeners('onCancelled')
    }
  }, []);

  useEffect(() => {
    if (!authenticated) { return setUser(null) }
    getUserData()
  }, [authenticated])

  return { authenticated, user };
};
