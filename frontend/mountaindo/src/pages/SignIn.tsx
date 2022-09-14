import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {RootStackParamList} from '../../AppInner';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  return (
    <View>
      <Text>로그인</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('FindId');
        }}>
        <Text>아이디 찾기</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('FindPassword');
        }}>
        <Text>비밀번호 찾기</Text>
      </Pressable>
    </View>
  );
}

export default SignIn;
