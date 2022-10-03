import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {Dimensions, StyleSheet, View} from 'react-native';

// props로 받아올 데이터 타입 지정
interface Props {
  selectedSubject: any;
  setSelectedSubject: any;
}

// 드롭다운 데이터
const dropDownData = [
  {
    id: 1,
    value: '산',
  },
  {id: 2, value: '등산로'},
];

function SearchSubjectPicker({selectedSubject, setSelectedSubject}: Props) {
  return (
    <View style={styles.pickerGroup}>
      <Picker
        selectedValue={selectedSubject}
        onValueChange={itemValue => {
          setSelectedSubject(itemValue);
        }}
        style={styles.picker}>
        {dropDownData &&
          dropDownData.map(item => (
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
    // justifyContent: 'space-between',
  },
  picker: {
    width: Dimensions.get('window').width / 2 - 60,
    // width: 120,
  },
  pickerItem: {
    fontSize: 12,
    // width: 10,
  },
});

export default SearchSubjectPicker;
