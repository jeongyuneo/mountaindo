import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {LoggedInParamList} from '../../../../AppInner';
import AppTextBold from '../../../components/AppTextBold';
import LocationPicker from '../../../components/user/LocationPicker';
import {userChange} from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';

// navigation을 사용하기 위해 type 설정
type AddressChangeFormScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'AddressChangeForm'
>;

function AddressChangeForm({navigation, route}: AddressChangeFormScreenProps) {
  const dispatch = useAppDispatch();
  // params에 데이터가 존재할 경우 초기값으로 설정
  const [selectedCity, setSelectedCity] = useState(
    route.params?.user.si ? route.params?.user.si : '',
  );
  // params에 데이터가 존재할 경우 초기값으로 설정
  const [selectedCity2, setSelectedCity2] = useState(
    route.params?.user.gu ? route.params?.user.gu : '',
  );

  // 주소 변경 버튼을 눌렀을 때 유효성 검사
  const onSubmit = useCallback(() => {
    dispatch(
      userChange({
        user: {...route.params?.user, si: selectedCity, gu: selectedCity2},
      }),
    ).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        // 유저 객체 업데이트
        route.params?.setUser({
          ...route.params?.user,
          si: selectedCity,
          gu:
            selectedCity2 === '없음' || selectedCity2 === null
              ? ''
              : selectedCity2,
        });
      }
    });

    navigation.navigate('유저');
    return Alert.alert('알림', '주소 변경에 성공하였습니다. ');
  }, [navigation, selectedCity, selectedCity2, route.params]);

  // 선택된 도시의 값이 없음이거나 null일 경우 버튼 활성화 처리
  const canGoNext =
    selectedCity2 === '없음' || selectedCity2 === null
      ? selectedCity
      : selectedCity && selectedCity2;

  return (
    <View style={styles.backColor}>
      <View style={styles.container}>
        <LocationPicker
          setSelectedCity={setSelectedCity}
          setSelectedCity2={setSelectedCity2}
          userInfo={route.params?.user}
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
          <AppTextBold style={styles.addressChangeButtonText}>
            주소 변경
          </AppTextBold>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backColor: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  addressChangeButton: {
    backgroundColor: 'rgba(87, 214, 150, 0.5)',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 20,
    width: '100%',
  },
  addressChangeButtonActive: {
    backgroundColor: '#57d696',
  },
  addressChangeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default AddressChangeForm;
