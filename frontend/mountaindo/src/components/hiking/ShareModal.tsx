import {
  faCloudArrowDown,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Modal, StyleSheet, Pressable, View} from 'react-native';
import AppText from '../AppText';

// Hiking 페이지(mountain) / VisitedDetail 페이지(trails)에서 받아온 Props 정보 type 설정
interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  kakaoShare: any;
  onCapture: any;
  onSave: any;
  getPhotoUri: any;
  moveToTrackingEnd: any;
  imageFile: any;
}

const ShareModal = ({
  modalVisible,
  setModalVisible,
  kakaoShare,
  onCapture,
  onSave,
  moveToTrackingEnd,
  imageFile,
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
        <Pressable
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Pressable
                style={styles.shareButton}
                onPress={() => {
                  moveToTrackingEnd(imageFile);
                }}>
                <AppText style={styles.shareText}>내 기록 저장하기</AppText>
              </Pressable>
              <Pressable onPress={kakaoShare} style={styles.shareButton}>
                <AppText style={styles.shareText}>
                  카카오톡으로 공유하기
                </AppText>
              </Pressable>
              <Pressable
                onPress={() => onCapture(null)}
                style={styles.shareButton}>
                <AppText style={styles.shareText}>SNS로 공유하기</AppText>
                <FontAwesomeIcon
                  icon={faShareNodes}
                  size={12}
                  style={styles.icon}
                />
              </Pressable>
              <Pressable onPress={onSave} style={styles.shareButton}>
                <AppText style={styles.shareText}>갤러리로 저장하기</AppText>
                <FontAwesomeIcon
                  icon={faCloudArrowDown}
                  size={12}
                  style={styles.icon}
                />
              </Pressable>
            </View>
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
    height: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  mountainImage: {
    width: 220,
    height: 150,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  textItem: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
  label: {
    fontSize: 10,
  },
  shareButton: {
    borderRadius: 30,
    width: 200,
    borderWidth: 2,
    padding: 15,
    borderColor: '#57d696',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    marginRight: 3,
  },
  icon: {
    marginBottom: 5,
  },
});

export default ShareModal;
