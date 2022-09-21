import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: boolean;
  goAllRank: any;
}

// MainPage에서도 사요되는 Dummy이므로 export
export const dummyUser = [
  {
    id: 1,
    profile: require('../../assets/user.png'),
    name: 'zerojei',
    meter: 3750,
  },
  {
    id: 2,
    profile: require('../../assets/jjang.png'),
    name: 'mountainDo',
    meter: 3720,
  },
  {
    id: 3,
    profile: require('../../assets/you.png'),
    name: 'mDoGod',
    meter: 2040,
  },
  {
    id: 4,
    profile: require('../../assets/user.png'),
    name: 'zerojei',
    meter: 3750,
  },
  {
    id: 5,
    profile: require('../../assets/jjang.png'),
    name: 'mountainDo',
    meter: 3720,
  },
  {
    id: 6,
    profile: require('../../assets/you.png'),
    name: 'mDoGod',
    meter: 2040,
  },
  {
    id: 7,
    profile: require('../../assets/user.png'),
    name: 'zerojei',
    meter: 3750,
  },
  {
    id: 8,
    profile: require('../../assets/jjang.png'),
    name: 'mountainDo',
    meter: 3720,
  },
  {
    id: 9,
    profile: require('../../assets/you.png'),
    name: 'mDoGod',
    meter: 2040,
  },
];

// MainPage에서도 사요되는 Dummy이므로 export
export const dummyFilter = dummyUser.filter(item => item.id < 4);
export const myFilter = dummyFilter.filter(
  item => item.id === 1 && item.name === 'zerojei',
);

function MainModal({isModalVisible, setIsModalVisible, goAllRank}) {
  let allNum = 1;
  let mynum = 1;
  return (
    <>
      <Modal
        style={{}}
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={styles.dummyFlex}></View>
        <View style={styles.mainFlex}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>MountainDo 전체랭킹</Text>
            <Pressable onPress={goAllRank}>
              <Text style={styles.closeModal}>X</Text>
            </Pressable>
          </View>
          <View style={styles.findInput}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={15}
              style={styles.magnify}
            />
            <TextInput
              placeholder="사용자 검색"
              style={styles.find}></TextInput>
          </View>
          <View>
            <Text style={styles.myRankTitle}>내 랭킹</Text>
          </View>
          <View>
            {myFilter.map(item => (
              <View>
                <View key={item.id} style={styles.myRank}>
                  <View style={styles.styleRow}>
                    <Text style={styles.rankNum}>{mynum++}</Text>
                    <View style={styles.styleRow}>
                      <Image source={item.profile} style={styles.imgStyle} />
                      <View style={styles.styleRow}>
                        <Text style={styles.nameStyle}>{item.name}</Text>
                        <Text style={styles.namePix}>님</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.meter}>{item.meter}m</Text>
                </View>
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.userTitle}>사용자 전체랭킹</Text>
          </View>
          <ScrollView>
            {dummyUser.map(item => (
              <View>
                <View key={item.id} style={styles.rankList}>
                  <View style={styles.styleRow}>
                    <Text style={styles.rankNum}>{allNum++}</Text>
                    <View style={styles.styleRow}>
                      <Image source={item.profile} style={styles.imgStyle} />
                      <View style={styles.styleRow}>
                        <Text style={styles.nameStyle}>{item.name}</Text>
                        <Text style={styles.namePix}>님</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.meter}>{item.meter}m</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  userTitle: {
    marginTop: 5,
    marginLeft: 7,
    marginBottom: 5,
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
  myRank: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  myRankTitle: {
    marginLeft: 7,
    marginBottom: 5,
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
  magnify: {
    marginTop: 17,
    marginLeft: 10,
  },
  find: {
    paddingBottom: 0,
    paddingRight: 250,
    marginLeft: 3,
  },
  findInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 5,
    marginRight: 20,
    marginBottom: 10,
  },
  dummyFlex: {
    flex: 0.5,
  },
  mainFlex: {
    flex: 1.5,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeModal: {
    marginTop: 8,
    marginRight: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
    paddingTop: 10,
    paddingLeft: 5,
  },
  styleRow: {
    flexDirection: 'row',
  },
  rankTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 3,
  },
  rankList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    marginHorizontal: 10,
  },
  imgStyle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 0.7,
    borderColor: 'gray',
    borderStyle: 'solid',
    marginRight: 5,
  },
  rankNum: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  nameStyle: {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 3,
    fontSize: 13,
  },
  namePix: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
    fontSize: 15,
  },
  meter: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MainModal;
