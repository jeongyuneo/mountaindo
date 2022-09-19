import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import DismissKeyboardView from '../../../components/DismissKeyboardView';

function ContactUs() {
  return (
    <DismissKeyboardView>
      <View>
        <View style={styles.noticeHeader}>
          <Text style={styles.noticeTitle}>문의하기</Text>
        </View>

        <View>
          <Text>답변 받으실 이메일</Text>
          <TextInput placeholder="이메일 입력" />
        </View>

        <View>
          <Text>문의 유형</Text>
          <TextInput placeholder="문의유형" />
        </View>

        <View>
          <Text>문의 내용</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.contactContents}
          />
        </View>
        <View>
          <Pressable style={styles.buttonStyle}>
            <Text style={styles.contactSubmit}>문의하기</Text>
          </Pressable>
        </View>
      </View>
    </DismissKeyboardView>
  );
}
const styles = StyleSheet.create({
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  noticeTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
  },
  line: {
    marginTop: 7,
    marginHorizontal: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buttonStyle: {
    backgroundColor: 'gray',
    borderRadius: 20,
    marginTop: 10,
    marginHorizontal: 40,
    paddingVertical: 5,
  },
  contactSubmit: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  contactContents: {
    height: 200,
    textAlignVertical: 'top',
    borderWidth: 0.5,
  },
});
export default ContactUs;
