// react import
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';

// component import
import {LoggedInParamList} from '../../../../AppInner';

// 공지사항 더미 데이터
const contentList = [
  {
    id: 1,
    title: '공지사항 1입니다. 읽어주세요',
    content: '안녕하세요. 1번 공지사항이에요',
  },
  {
    id: 2,
    title: '공지사항 2입니다. 읽어주세요',
    content: '안녕하세요. 2번 공지사항이에요',
  },
  {
    id: 3,
    title: '공지사항 3입니다. 읽어주세요',
    content: '안녕하세요. 3번 공지사항이에요',
  },
  {
    id: 4,
    title: '공지사항 4입니다. 읽어주세요',
    content: '안녕하세요. 4번 공지사항이에요',
  },
];

// Navigation 사용
type NoticeScreenProps = NativeStackScreenProps<LoggedInParamList, 'Notice'>;
function Notice({navigation}: NoticeScreenProps) {
  return (
    <View>
      <View style={styles.noticeHeader}>
        <Text style={styles.noticeTitle}>공지사항</Text>
        <Pressable
          onPress={() => {
            navigation.push('ContactUs');
          }}>
          <Text style={styles.chatTitle}>문의하기</Text>
        </Pressable>
      </View>
      <View style={styles.line} />
      <View style={styles.noticeList}>
        {/* 반복문을 활용하여 공지사항 리스트 제공 */}
        {contentList.map(item => (
          <View style={styles.noticeContent}>
            <Pressable
              onPress={() => {
                Alert.alert(`${item.id}번 공지사항 읽기`, `${item.content}`);
              }}>
              <Text style={styles.listTitle} key={item.id}>
                {item.title}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
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
  chatTitle: {
    marginTop: 7,
    marginRight: 10,
  },
  line: {
    marginTop: 7,
    marginHorizontal: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  noticeList: {
    marginTop: 5,
    marginHorizontal: 5,
  },
  noticeContent: {
    borderWidth: 0.5,
    borderColor: 'gray',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 5,
  },
  listTitle: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Notice;
