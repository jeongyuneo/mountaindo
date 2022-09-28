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
import DismissKeyboardView from '../DismissKeyboardView';
import {Rankings} from '../../pages/Main';

interface Props {
  isModalVisible: any;
  setIsModalVisible: any;
  goAllRank: any;
  rankingList: any;
  myRanking: any;
}

function MainModal({
  isModalVisible,
  setIsModalVisible,
  goAllRank,
  rankingList,
  myRanking,
}: Props) {
  let allNum = 1;
  let mynum = 1;

  const searchData = (text: any) => {
    console.log(text);
  };

  return (
    <>
      <DismissKeyboardView>
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
                style={styles.find}
                onChangeText={text => searchData(text)}
              />
            </View>
            <View>
              <Text style={styles.myRankTitle}>내 랭킹</Text>
            </View>
            <View>
              <View style={styles.myRank}>
                <View style={styles.styleRow}>
                  <Text style={styles.rankNum}>{myRanking?.ranking}</Text>
                  <View style={styles.styleRow}>
                    <Image
                      source={myRanking?.imageUrl}
                      style={styles.imgStyle}
                    />
                    <View style={styles.styleRow}>
                      <Text style={styles.nameStyle}>
                        {myRanking?.nickname}
                      </Text>
                      <Text style={styles.namePix}>님</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.meter}>
                  {myRanking?.accumulatedHeight}m
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.userTitle}>사용자 전체랭킹</Text>
            </View>
            <ScrollView>
              {rankingList.map((item: Rankings) => (
                <View>
                  <View key={item.ranking} style={styles.rankList}>
                    <View style={styles.styleRow}>
                      <Text style={styles.rankNum}>{item.ranking}</Text>
                      <View style={styles.styleRow}>
                        {/* <Image source={item.imageUrl} style={styles.imgStyle} /> */}
                        <View style={styles.styleRow}>
                          <Text style={styles.nameStyle}>{item.nickname}</Text>
                          <Text style={styles.namePix}>님</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.meter}>{item.accumulatedHeight}m</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </DismissKeyboardView>
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
