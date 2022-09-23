import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  userName: string;
  content: string;
}

function Review({userName, content}: Props) {
  return (
    <View style={styles.reviewWrapper}>
      <Text style={styles.userNameText}>{userName}님</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewWrapper: {
    marginVertical: 5,
  },
  userNameText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 11,
  },
  contentText: {
    fontSize: 10,
  },
});
export default Review;
