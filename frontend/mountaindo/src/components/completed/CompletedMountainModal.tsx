import {faShareFromSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Share,
  Alert,
} from 'react-native';

// Hiking 페이지(mountain) / VisitedDetail 페이지(trails)에서 받아온 Props 정보 type 설정
interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  mountain?: string;
  trails?: any;
}

const CompletedMountainModal = ({
  modalVisible,
  setModalVisible,
  mountain,
  trails,
}: Props) => {
  // sns 공유 -> RN Share 사용
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'sns로 공유하기',
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  // mountain 정보가 있으면 완등한 산의 모달 없으면 방문한 등산로 모달
  return mountain ? (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>완등한 산 정보</Text>
            <Text style={styles.modalText}>{mountain}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    trails && (
      <View style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable onPress={onShare} style={styles.shareButton}>
                <FontAwesomeIcon icon={faShareFromSquare} size={15} />
              </Pressable>
              <View>
                <Image
                  source={require('../../assets/gps-sample.png')}
                  style={styles.mountainImage}
                />
              </View>
              <View style={styles.textContainer}>
                <View style={styles.textItem}>
                  <Text style={styles.text}>{trails?.totalDistance} km</Text>
                  <Text style={styles.label}>총 거리</Text>
                </View>
                <View style={styles.textItem}>
                  <Text style={styles.text}>{trails?.timeDuration}</Text>
                  <Text style={styles.label}>소요 시간</Text>
                </View>
                <View style={styles.textItem}>
                  <Text style={styles.text}>{trails?.totalHigh} km</Text>
                  <Text style={styles.label}>총 고도</Text>
                </View>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  mountainImage: {
    width: 200,
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
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },
  label: {
    fontSize: 10,
  },
  shareButton: {
    alignSelf: 'flex-end',
  },
});

export default CompletedMountainModal;
