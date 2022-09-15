import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {LoggedInParamList} from '../../AppInner';
type SignInScreenProps = NativeStackScreenProps<LoggedInParamList, 'Main'>;
function Main({navigation}: SignInScreenProps) {
  return (
    <View>
      <Text onPress={() => navigation.navigate('MyPage')}>Test</Text>
    </View>
  );
}

export default Main;
