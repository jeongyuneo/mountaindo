import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function EasyMountain() {
  return (
    <View>
      <View>
        <Text style={styles.easyTitle}>쉬운 난이도의 등산 코스</Text>
      </View>

      <View>
        <Text style={styles.easyList}>여기는 사진들 사르륵</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  easyTitle: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  easyList: {
    fontSize: 20,
  },
});

export default EasyMountain;
