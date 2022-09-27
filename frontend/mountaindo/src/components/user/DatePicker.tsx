import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// props로 받은 정보의 type 지정
interface Props {
  setCheck: any;
  setSelectedDate: any;
  selectedDate: any;
}

function DatePicker({setCheck, setSelectedDate, selectedDate}: Props) {
  const [date, onChangeDate] = useState(new Date()); // 선택한 날짜를 저장할 변수
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // 달력을 화면에 띄울지 말지를 결정하는 변수

  // 달력을 화면에 띄우는 함수
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // 달력을 화면에서 사라지게 하는 함수
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // 날짜를 저장할 함수
  const handleConfirm = (checked: any) => {
    hideDatePicker(); // 달력을 화면에서 없애줌
    onChangeDate(checked); // 날짜 데이터 저장
    setCheck((curr: number) => curr + 1); // props를 변경시켜 FindId 컴포넌트에서 날짜를 체크했는지 확인
    setSelectedDate(JSON.stringify(checked).split('T')[0].replace('"', '')); // 날짜 데이터를 문자열로 가공
  };

  return (
    <View>
      <Pressable onPress={showDatePicker} style={styles.dateButton}>
        <Text
          style={
            selectedDate
              ? StyleSheet.compose(styles.buttonText, styles.buttonTextActive)
              : styles.buttonText
          }>
          {selectedDate ? selectedDate : '생년월일을 입력해주세요'}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateButton: {
    borderBottomWidth: 1,
  },
  buttonText: {
    paddingVertical: 15,
    color: 'grey',
  },
  buttonTextActive: {
    color: 'black',
  },
});

export default DatePicker;
