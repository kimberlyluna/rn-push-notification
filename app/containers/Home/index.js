import React, { useEffect, useState } from 'react';
import { Notifications } from 'react-native-notifications';
import { useOktaAuth } from '../../util/auth';
import { signOut } from '@okta/okta-react-native';

import {
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';

export default Home = ({ navigation }) => {
  const { authenticated, user } = useOktaAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(null);
  const [devicetoken, setDevicetoken] = useState(null); 

  console.log(authenticated, user)

  const checkNotificationPermissions = async () => {
    const permit = await Notifications.isRegisteredForRemoteNotifications();
    setNotificationsEnabled(permit);
  }

  useEffect(() => {
    Notifications.events().registerRemoteNotificationsRegistered(({ deviceToken = null }) => {
      console.log("Device Token Received", deviceToken);
      setDevicetoken(deviceToken) // TODO: Send this token to API
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed((event) => {
      console.error(event);
    });

    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
      console.log('Notification received in foreground:', notification.payload);
      navigation.navigate('Confirmation');
      completion({alert: false, sound: false, badge: false});
    });

    Notifications.events().registerNotificationOpened((notification, completion) => {
      console.log("Notification opened by device user", notification.payload);
      navigation.navigate('Confirmation');
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
      <Text>{user && `Hello ${user.name}`}</Text>
      <Button title='Log out' onPress={async () => signOut()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginHorizontal: 20,
    marginVertical: 100,
    flex: 1,
    alignItems: 'center'
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 80,
    justifyContent: 'space-between',
    height: 120,
  }
});