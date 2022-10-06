import {
  faCloudArrowDown,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useRef} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  Image,
  Share,
  Alert,
} from 'react-native';
import Config from 'react-native-config';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ViewShot from 'react-native-view-shot';

// Hiking 페이지(mountain) / VisitedDetail 페이지(trails)에서 받아온 Props 정보 type 설정
interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  mountain?: any;
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

  const captureRef = useRef<any>(); // 캡쳐할 영역의 값을 가져오기 위한 ref

  // 지정된 영역 캡쳐해서 uri 생성
  const getPhotoUri = async (): Promise<string> => {
    const uri = await captureRef.current.capture();
    return uri;
  };

  const onSave = async () => {
    const uri = await getPhotoUri();
    const result = await CameraRoll.save(uri);
    Alert.alert('이미지 저장', '갤러리에 이미지가 저장되었습니다. ');
  };
  // mountain 정보가 있으면 완등한 산의 모달 없으면 방문한 등산로 모달
  return mountain?.mountainName ? (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <View>
              <AppTextBold style={styles.modalText}>
                {mountain.mountainName}
              </AppTextBold>
              <View style={styles.textGroup}>
                <AppTextBold style={styles.labelText}>주소</AppTextBold>
                <AppText style={styles.dateText}>{mountain.address}</AppText>
              </View>
              <View style={styles.textGroup}>
                <AppTextBold style={styles.labelText}>
                  마지막 등산 날짜
                </AppTextBold>
                <AppText style={styles.dateText}>
                  {mountain.lastHikingDate}
                </AppText>
              </View>
              <View style={styles.textGroup}>
                <AppTextBold style={styles.labelText}>
                  마지막 방문 코스
                </AppTextBold>
                <AppText style={styles.dateText}>
                  {mountain.lastHikingTrailName}
                </AppText>
              </View>
            </View>
          </View>
        </Pressable>
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
          <Pressable
            style={styles.centeredView}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.visitedModalView}>
              <View style={styles.shareButton}>
                <Pressable onPress={onShare}>
                  <FontAwesomeIcon
                    icon={faShareNodes}
                    size={15}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable onPress={onSave}>
                  <FontAwesomeIcon
                    icon={faCloudArrowDown}
                    size={15}
                    style={styles.icon}
                  />
                </Pressable>
              </View>
              <ViewShot
                ref={captureRef}
                options={{format: 'jpg', quality: 0.9}}>
                <Image
                  source={{uri: Config.REACT_APP_BE_HOST + trails.imageUrl}}
                  style={styles.mountainImage}
                />
              </ViewShot>
              <View style={styles.titleView}>
                <AppTextBold style={styles.trailName}>
                  {trails.trailName}
                </AppTextBold>
                <AppText style={styles.mountainName}>
                  {trails.mountainName}
                </AppText>
              </View>
              <AppText style={styles.mountainName}>{trails.address}</AppText>
              <View style={styles.textContainer}>
                <View style={styles.textItem}>
                  <AppTextBold style={styles.text}>
                    {trails.distance} km
                  </AppTextBold>
                  <AppText style={styles.label}>총 거리</AppText>
                </View>
                <View style={styles.textItem}>
                  <AppTextBold style={styles.text}>
                    {trails.useTime}
                  </AppTextBold>
                  <AppText style={styles.label}>소요 시간</AppText>
                </View>
                <View style={styles.textItem}>
                  <AppTextBold style={styles.text}>
                    {trails.accumulatedHeight} m
                  </AppTextBold>
                  <AppText style={styles.label}>총 고도</AppText>
                </View>
              </View>
            </View>
          </Pressable>
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
  visitedModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 300,
    height: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexWrap: 'wrap',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  mountainImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  textItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
  },
  label: {
    fontSize: 9,
  },
  shareButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 13,
  },
  dateText: {
    fontSize: 13,
    marginBottom: 10,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  trailName: {
    fontSize: 15,
  },
  mountainName: {
    fontSize: 12,
  },
  icon: {
    marginHorizontal: 5,
  },
  textGroup: {},
  labelText: {
    fontSize: 13,
    marginBottom: 3,
  },
});

export default CompletedMountainModal;
