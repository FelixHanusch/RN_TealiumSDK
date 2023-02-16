import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './screens/Home';
import Action from './screens/Action';

import './tealium';

import {RootStackParamList} from './types/RootStackParams';

import Tealium from 'tealium-react-native';
import {
  TealiumConfig,
  Dispatchers,
  Collectors,
  ConsentPolicy,
  ConsentStatus,
  TealiumEnvironment,
} from 'tealium-react-native/common';

let config: TealiumConfig = {
  account: 't-systems-ms-training',
  profile: 'magtv-android-mobile',
  environment: TealiumEnvironment.dev,
  dispatchers: [
    Dispatchers.Collect,
    Dispatchers.RemoteCommands,
    Dispatchers.TagManagement,
  ],
  collectors: [
    Collectors.AppData,
    Collectors.DeviceData,
    Collectors.Lifecycle,
    Collectors.Connectivity,
  ],
  consentPolicy: ConsentPolicy.gdpr,
  visitorServiceEnabled: true,
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function App(): JSX.Element {
  Tealium.initialize(config, success => {
    if (!success) {
      console.log('Tealium not initialized');
      return;
    }
    console.log('Tealium initialized');
    Tealium.setConsentStatus(ConsentStatus.consented);
    Tealium.addRemoteCommand('hello', payload => {
      console.log('hello remote command');
      console.log(JSON.stringify(payload));
    });
  });
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarIconStyle: {display: 'none'},
          tabBarLabelStyle: {bottom: '40%', fontSize: 14},
          headerShown: false,
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Action" component={Action} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
