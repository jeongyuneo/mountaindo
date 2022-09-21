import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';

type MountainScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'Mountain'
>;

function Mountain({navigation}: MountainScreenProps) {
  return (
    <View>
      <Text> MountTain</Text>
      <Pressable onPress={() => navigation.navigate('MountainDetail')}>
        <Text>MountainDetail</Text>
      </Pressable>
    </View>
  );
}

export default Mountain;
