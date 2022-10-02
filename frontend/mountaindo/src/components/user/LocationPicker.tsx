import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Region} from './Location';
import {Dimensions, StyleSheet, View} from 'react-native';

// 사용자 주소 더미 객체 타입 지정
type RegionType = {
  id: number;
  value: string;
  city: {id: number; value: string}[];
};

// props로 받아올 데이터 타입 지정
interface Props {
  setSelectedCity: any;
  setSelectedCity2: any;
  userInfo?: any;
}

function LocationPicker({setSelectedCity, setSelectedCity2, userInfo}: Props) {
  // 도 / 광역시 / 특별시 저장 변수 (props로 받아온 정보가 있는 경우 해당 정보를 초기값으로 설정)
  const [category, setCategory] = useState(
    userInfo?.address.value ? userInfo.address.value : '',
  );
  // 시 / 군 저장 변수 (props로 받아온 정보가 있는 경우 해당 정보를 초기값으로 설정)
  const [city, setCity] = useState(
    userInfo?.address.cityValue ? userInfo.address.cityValue : '',
  );

  // 선택한 상위 컴포넌트에 하위 도시가 존재할 경우 저장할 변수
  const [cityList, setCityListTest] = useState<RegionType | null>(null);
  const region = Region; // 더미 데이터 저장 변수

  // 상위 컴포넌트에 하위 도시가 있을 경우 변수에 저장시키는 함수
  const setCityList = (text: string) => {
    // 선택된 상위 컴포넌트의 하위 도시 저장
    const selected: RegionType = region.filter(item => item.value === text)[0];
    setCityListTest(selected);

    // 하위 도시가 없는 경우
    if (selected.city.length === 0) {
      setSelectedCity2('없음');
    } else {
      setSelectedCity2(selected.city[0].value);
    }
  };

  // 처음 렌더링될 때 userInfo에 사용자 주소 데이터 존재할 경우 화면에 보여줌
  useEffect(() => {
    if (userInfo?.address.value) {
      setCityList(userInfo.address.value);
    }
  }, []);
  return (
    <View style={styles.pickerGroup}>
      {/* 상위 도 / 시 */}
      <Picker
        selectedValue={category}
        onValueChange={itemValue => {
          setCategory(itemValue);
          setCityList(itemValue);
          setSelectedCity(itemValue);
        }}
        style={styles.picker}>
        {region &&
          region.map(item => (
            <Picker.Item
              key={item.id}
              label={item.value}
              value={item.value}
              fontFamily={'NanumBarunGothic'}
              style={styles.pickerItem}
            />
          ))}
      </Picker>
      {/* 하위 시 / 군 */}
      <Picker
        selectedValue={city}
        onValueChange={itemValue => {
          setCity(itemValue);
          setSelectedCity2(itemValue);
        }}
        style={styles.picker}>
        {cityList?.city &&
          cityList.city.length > 0 &&
          cityList.city.map(item => (
            <Picker.Item
              key={item.id}
              label={item.value}
              value={item.value}
              fontFamily={'NanumBarunGothic'}
              style={styles.pickerItem}
            />
          ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: Dimensions.get('window').width / 2 - 20,
  },
  pickerItem: {
    fontSize: 12,
  },
});

export default LocationPicker;
