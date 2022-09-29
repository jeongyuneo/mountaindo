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
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';

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
          <View style={styles.mainFlex}>
            <View style={styles.modalHeader}>
              <AppTextBold style={styles.modalTitle}>
                MountainDo 전체랭킹
              </AppTextBold>
              <Pressable onPress={goAllRank}>
                <AppTextBold style={styles.closeModal}>X</AppTextBold>
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
              <AppTextBold style={styles.myRankTitle}>내 랭킹</AppTextBold>
            </View>
            <View>
              <View style={styles.myRank}>
                <View style={styles.styleRow}>
                  <AppTextBold style={styles.rankNum}>
                    {myRanking?.ranking}
                  </AppTextBold>
                  <Image source={myRanking?.imageUrl} style={styles.imgStyle} />
                  <AppTextBold style={styles.nameStyle}>
                    {myRanking?.nickname}
                  </AppTextBold>
                  <Text style={styles.namePix}>님</Text>
                </View>
                <AppTextBold>{myRanking?.accumulatedHeight}m</AppTextBold>
              </View>
            </View>

            <View>
              <AppTextBold style={styles.userTitle}>
                사용자 전체랭킹
              </AppTextBold>
            </View>
            <ScrollView>
              {rankingList?.length > 0 &&
                rankingList.map((item: Rankings) => (
                  <View>
                    <View key={item.ranking} style={styles.rankList}>
                      <View style={styles.styleRow}>
                        <AppTextBold style={styles.rankNum}>
                          {item.ranking}
                        </AppTextBold>
                        <Image
                          source={item?.imageUrl}
                          style={styles.imgStyle}
                        />
                        <AppTextBold style={styles.nameStyle}>
                          {item.nickname}
                        </AppTextBold>
                        <AppText style={styles.namePix}>님</AppText>
                      </View>
                      <AppTextBold>{item.accumulatedHeight}m</AppTextBold>
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
    alignItems: 'center',
  },
  myRankTitle: {
    marginLeft: 7,
    marginBottom: 5,
    fontSize: 13,
  },
  magnify: {
    marginTop: 17,
    marginLeft: 10,
  },
  find: {
    paddingBottom: 0,
    paddingRight: 250,
    marginLeft: 3,
    fontFamily: 'NanumBarunGothic',
  },
  findInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 5,
    marginRight: 20,
    marginBottom: 10,
  },
  mainFlex: {
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
  },
  modalTitle: {
    fontSize: 17,
    paddingTop: 10,
    paddingLeft: 5,
  },
  styleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rankList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    marginHorizontal: 10,
    alignItems: 'flex-end',
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
    marginRight: 10,
  },
  nameStyle: {
    fontSize: 15,
  },
  namePix: {
    marginLeft: 5,
    fontSize: 15,
  },
});

export default MainModal;
