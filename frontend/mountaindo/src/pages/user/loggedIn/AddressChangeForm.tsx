import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../../../AppInner';
import LocationPicker from '../../../components/user/LocationPicker';

// navigation을 사용하기 위해 type 설정
type AddressChangeFormScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'AddressChangeForm'
>;

function AddressChangeForm({navigation, route}: AddressChangeFormScreenProps) {
  // params에 데이터가 존재할 경우 초기값으로 설정
  const [selectedCity, setSelectedCity] = useState(
    route.params?.userInfo.address.value
      ? route.params?.userInfo.address.value
      : '',
  );
  // params에 데이터가 존재할 경우 초기값으로 설정
  const [selectedCity2, setSelectedCity2] = useState(
    route.params?.userInfo.address.cityValue
      ? route.params?.userInfo.address.cityValue
      : '',
  );

  // 주소 변경 버튼을 눌렀을 때 유효성 검사
  const onSubmit = useCallback(() => {
    // 유저 객체 업데이트
    route.params?.setUserInfo({
      ...route.params?.userInfo,
      address: {
        value: selectedCity,
        cityValue:
          selectedCity2 === '없음' || selectedCity2 === null
            ? ''
            : selectedCity2,
      },
    });
    navigation.navigate('UserInfoChange');
    return Alert.alert('알림', '주소 변경에 성공하였습니다. ');
  }, [navigation, selectedCity, selectedCity2, route.params]);

  // 선택된 도시의 값이 없음이거나 null일 경우 버튼 활성화 처리
  const canGoNext =
    selectedCity2 === '없음' || selectedCity2 === null
      ? selectedCity
      : selectedCity && selectedCity2;
  console.log(selectedCity2);

  return (
    <View style={styles.container}>
      <LocationPicker
        setSelectedCity={setSelectedCity}
        setSelectedCity2={setSelectedCity2}
        userInfo={route.params?.userInfo}
      />
      <Pressable
        disabled={!canGoNext}
        onPress={onSubmit}
        style={
          canGoNext
            ? StyleSheet.compose(
                styles.addressChangeButton,
                styles.addressChangeButtonActive,
              )
            : styles.addressChangeButton
        }>
        <Text style={styles.addressChangeButtonText}>주소 변경</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  addressChangeButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  addressChangeButtonActive: {
    backgroundColor: 'blue',
  },
  addressChangeButtonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default AddressChangeForm;
