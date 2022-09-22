// React
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Component
import {LoggedInParamList} from '../../AppInner';
import MainModal from '../components/main/MainModal';
import RankList from '../components/main/RankList';
import EasyMountain from '../components/main/EasyMountain';
import Photo from '../components/main/Photo';
import {dummyEasy, dummyAge} from '../components/main/Dummy';
import AgeMountain from '../components/main/AgeMountain';

type MainInScreenProps = NativeStackScreenProps<LoggedInParamList, 'Main'>;
function Main({navigation}: MainInScreenProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const goAllRank = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.containerMain}>
      <ScrollView>
        <MainModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          goAllRank={goAllRank}
        />
        <View style={styles.photoContainer}>
          <Photo />
        </View>

        <View style={styles.suggestionContainer}>
          <RankList goAllRank={goAllRank} />

          <View>
            <Text style={styles.easyTitle}>쉬운 난이도의 등산 코스</Text>
            <EasyMountain dummyEasy={dummyEasy} />
          </View>

          <View>
            <Text style={styles.easyTitle}>20대에게 인기있는 등산 코스</Text>
            <AgeMountain dummyAge={dummyAge} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  photoContainer: {
    flex: 1.2,
  },
  suggestionContainer: {
    flex: 2,
  },
  easyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 3,
    paddingVertical: 10,
  },
});

export default Main;
