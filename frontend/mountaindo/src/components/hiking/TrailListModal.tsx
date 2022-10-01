import React from 'react';
import {Modal, StyleSheet, Pressable, View, ScrollView} from 'react-native';
import {Trails} from '../../pages/hiking/FindMountain';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';

// Hiking 페이지(mountain) / VisitedDetail 페이지(trails)에서 받아온 Props 정보 type 설정
interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  isMountain: any;
  isTrailList: any;
  trailList: Trails[];
  mountainName: any;
  moveToHiking: any;
}

const TrailListModal = ({
  modalVisible,
  setModalVisible,
  isMountain,
  isTrailList,
  trailList,
  mountainName,
  moveToHiking,
}: Props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable style={styles.centeredView}>
          <View style={styles.modalView}>
            {isMountain === 2 && isTrailList && trailList?.length > 0 ? (
              <ScrollView>
                <View style={styles.searchContainer}>
                  {mountainName && (
                    <AppTextBold style={styles.mountainText}>
                      {mountainName}의 등산 코스
                    </AppTextBold>
                  )}
                  <AppTextBold style={styles.chooseText}>
                    등산 코스를 선택해주세요
                  </AppTextBold>
                  {trailList.map((item, index) => (
                    <Pressable
                      key={index}
                      style={styles.searchList}
                      onPress={() => {
                        moveToHiking(item.trailId, item.name);
                      }}>
                      <AppTextBold key={index}>{item?.name}</AppTextBold>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            ) : isMountain === 1 ? (
              <View style={styles.searchContainer}>
                <AppText style={styles.text}>검색 결과가 없습니다.</AppText>
                <AppText style={styles.text}>다른 산을 검색해주세요!</AppText>
              </View>
            ) : (
              <></>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchContainer: {
    marginTop: 20,
  },
  searchList: {
    marginBottom: 10,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#57d696',
    paddingBottom: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  mountainText: {
    marginLeft: 5,
  },
  text: {
    fontSize: 15,
  },
  chooseText: {
    marginLeft: 5,
    marginBottom: 20,
  },
});

export default TrailListModal;
