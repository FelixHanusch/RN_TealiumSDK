import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Tealium from 'tealium-react-native';
import {TealiumView, TealiumEvent} from 'tealium-react-native/common';

import {RootStackParamList} from '../types/RootStackParams';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
type Props = BottomTabScreenProps<RootStackParamList>;

export default function Action({navigation}: Props): JSX.Element {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let view = new TealiumView('VIEW_NAME_FELIX_ACTION', {
        contentID: 'felixAction',
        event_name: 'eventNameFelix',
      });
      Tealium.track(view);
    });

    return unsubscribe;
  }, [navigation]);

  const buttonHandler = () => {
    console.log('button pressed');
    let event = new TealiumEvent('EVENT_NAME_FELIX_ACTION', {
      contentID: 'felixButton',
      tealium_event: 'tealiumEventFelix',
      linkID: 'felixLinkID',
    });
    Tealium.track(event);
  };

  return (
    <View style={styles.actionContainer}>
      <Pressable style={styles.button} onPress={() => buttonHandler()}>
        <Text>Example button</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 10,
  },
});
