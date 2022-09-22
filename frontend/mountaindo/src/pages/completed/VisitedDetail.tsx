import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import TrailList from '../../components/completed/TrailList';

// route 사용을 위한 type설정
type VisitedDetailScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'VisitedDetail'
>;

function VisitedDetail({route}: VisitedDetailScreenProps) {
  // 페이지 이동 시 함께 전달된 param에 해당 정보가 있는 경우 변수에 할당
  const mountain = route.params?.mountain;
  const location = route.params?.location;
  const trails = route.params?.trails;

  return (
    <View>
      <Image
        source={require('../../assets/mountainTwo.png')}
        style={styles.mountainImage}
      />
      <View>
        <Text style={styles.title}>{mountain}</Text>
        <Text style={styles.content}>{location}</Text>
      </View>
      <TrailList trails={trails} />
    </View>
  );
}

const styles = StyleSheet.create({
  mountainImage: {
    width: Dimensions.get('window').width,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  content: {
    fontSize: 15,
  },
});
export default VisitedDetail;
