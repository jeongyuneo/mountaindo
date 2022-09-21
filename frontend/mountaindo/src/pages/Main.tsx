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

type MainInScreenProps = NativeStackScreenProps<LoggedInParamList, 'Main'>;
function Main({navigation}: MainInScreenProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const goAllRank = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.containerMain}>
      <MainModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        goAllRank={goAllRank}
      />
      <View style={styles.photoContainer}>
        <Photo />
      </View>

      <View style={styles.suggestionContainer}>
        <ScrollView>
          <RankList goAllRank={goAllRank} />
          <EasyMountain />

          <View>
            <Text>20대에게 인기있는 등산 코스</Text>
          </View>
        </ScrollView>
      </View>
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
});

export default Main;
