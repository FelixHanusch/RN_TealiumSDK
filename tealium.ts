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
