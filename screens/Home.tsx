import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

import Tealium from 'tealium-react-native';
import {TealiumView} from 'tealium-react-native/common';

import {RootStackParamList} from '../types/RootStackParams';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
type Props = BottomTabScreenProps<RootStackParamList>;

export default function Home({navigation}: Props): JSX.Element {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let view = new TealiumView('VIEW_NAME_FELIX_HOME', {
        contentID: 'felixHome',
        event_name: 'eventNameFelix',
      });
      Tealium.track(view);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar barStyle={'default'} />
      <View>
        <Text style={styles.h1}>Willkommen!</Text>
        <Text>In dieser Demo wird die SDK von Tealium ausprobiert.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
