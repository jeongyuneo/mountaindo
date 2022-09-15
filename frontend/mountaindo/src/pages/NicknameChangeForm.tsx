import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Alert,
} from 'react-native';
import {LoggedInParamList} from '../../AppInner';

// navigation을 사용하기 위해 type 설정
type NicknameChangeFormScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'NicknameChangeForm'
>;

function NicknameChangeForm({
  navigation,
  route,
}: NicknameChangeFormScreenProps) {
  // 사용자 별명을 저장할 변수, route에 값이 있을 경우 기존에 존재하는 값을 가져옴
  const [nickname, setNickname] = useState(
    route ? route.params?.userInfo.nickname : '',
  );
  const nicknameRef = useRef<TextInput | null>(null); // 사용자 별명 input의 값 가져오기

  // 사용자 별명 input값 변경 시 nickname 변수에 값 변경
  const onChangeNickname = useCallback((text: string) => {
    setNickname(text.trim());
  }, []);

  // 닉네임 변경 버튼을 눌렀을 때 유효성 검사
  const onSubmit = useCallback(async () => {
    if (!nickname || !nickname.trim()) {
      return Alert.alert('알림', '별명을 입력해주세요.');
    }
    if (route.params?.userInfo.nickname === nickname) {
      return Alert.alert(
        '알림',
        '기존과 동일한 닉네임으로는 변경할 수 없습니다.',
      );
    }

    // 유효성 검사에 통과했을 경우 params로 받아온 user 정보를 변경시켜줌
    route.params?.setUserInfo({
      ...route.params?.userInfo,
      nickname: nickname,
    });
    navigation.navigate('UserInfoChange');
    return Alert.alert('알림', '닉네임 변경에 성공하였습니다. ');
  }, [navigation, nickname, route.params]);

  const canGoNext = nickname; // 버튼 disabled 확인할 변수
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNickname}
          importantForAutofill="yes"
          autoComplete="name"
          textContentType="name"
          value={nickname}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={nicknameRef}
          blurOnSubmit={false}
        />
      </View>
      <Pressable
        disabled={!canGoNext}
        onPress={onSubmit}
        style={
          canGoNext
            ? StyleSheet.compose(
                styles.nicknameChangeButton,
                styles.nicknameChangeButtonActive,
              )
            : styles.nicknameChangeButton
        }>
        <Text style={styles.nicknameChangeButtonText}>닉네임 변경</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  inputView: {
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    color: 'black',
  },
  nicknameChangeButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  nicknameChangeButtonActive: {
    backgroundColor: 'blue',
  },
  nicknameChangeButtonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default NicknameChangeForm;
