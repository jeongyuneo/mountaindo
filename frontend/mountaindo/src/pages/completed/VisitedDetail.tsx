import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import AppText from '../../components/AppText';
import AppTextBold from '../../components/AppTextBold';
import CompletedMountainModal from '../../components/completed/CompletedMountainModal';
import TrailList from '../../components/completed/TrailList';

// route 사용을 위한 type설정
type VisitedDetailScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'VisitedDetail'
>;

function VisitedDetail({route}: VisitedDetailScreenProps) {
  const [modalVisible, setModalVisible] = useState(false); // 모달을 화면에 띄울지 결정한는 변수
  const [modalNumber, setModalNumber] = useState(0); // trail의 id값을 저장할 변수

  // 페이지 이동 시 함께 전달된 param에 해당 정보가 있는 경우 변수에 할당
  const mountain = route.params?.mountain;
  const location = route.params?.location;
  const trails = route.params?.trails;

  return (
    <ScrollView>
      <Image
        source={require('../../assets/mountainTwo.png')}
        style={styles.mountainImage}
      />
      <View style={styles.container}>
        <View>
          <AppTextBold style={styles.title}>{mountain}</AppTextBold>
          <AppText style={styles.content}>{location}</AppText>
        </View>
        <TrailList
          trails={trails}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setModalNumber={setModalNumber}
        />
      </View>
      {modalVisible && (
        <CompletedMountainModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          trails={trails[modalNumber - 1]} // 받아온 id번호로 trails리스트에서 해당하는 정보 전달
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mountainImage: {
    width: Dimensions.get('window').width,
  },
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  content: {
    fontSize: 13,
  },
});
export default VisitedDetail;
