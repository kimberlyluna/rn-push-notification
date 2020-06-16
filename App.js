/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
} from 'react-native';

import {
  signIn,
  signOut,
} from '@okta/okta-react-native';

import {
  useOktaAuth,
} from './app/util/auth';

import { Notifications } from 'react-native-notifications';

const App = () => {
  const { authenticated, user } = useOktaAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(null);
  const [devicetoken, setDevicetoken] = useState(null);

  const checkNotificationPermissions = async () => {
    const permit = await Notifications.isRegisteredForRemoteNotifications();
    setNotificationsEnabled(permit);
  }

  useEffect(() => {
    Notifications.events().registerRemoteNotificationsRegistered(({ deviceToken = null }) => {
      console.log("Device Token Received", deviceToken);
      setDevicetoken(deviceToken)
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed((event) => {
      console.error(event);
    });

    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
      console.log('Notification received in foreground:', notification.payload);
      completion({alert: false, sound: false, badge: false});
    });

    Notifications.events().registerNotificationOpened((notification, completion, action) => {
      console.log("Notification opened by device user", notification.payload);
      console.log(`Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`);
      completion();
    });
    
    checkNotificationPermissions();
  },[]);

  useEffect(() => {
    if (authenticated && notificationsEnabled) {
      Notifications.registerRemoteNotifications();
    }
  }, [authenticated, notificationsEnabled]);

  return (
    <View style={styles.body}>
      <Text style={styles.text}>{user && `Welcome ${user.name}!`}</Text>
      <Text style={styles.text}>{devicetoken && authenticated && `This is your device Token: "${devicetoken}"`}</Text>
      <Button
        onPress={async () => authenticated ? signOut() : signIn()} 
        title={authenticated ? 'Log Out' : 'Login' } 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    fontSize: 24,
    fontWeight: '400',
    color: 'black',
  },
  body: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
  }
});

export default App;
