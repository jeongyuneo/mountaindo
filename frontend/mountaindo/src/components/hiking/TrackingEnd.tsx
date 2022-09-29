import React, {useRef} from 'react';
import {Alert, Dimensions, Pressable, StyleSheet, View} from 'react-native';
import ViewShot from 'react-native-view-shot';
import ResultMap from './ResultMap';
import Share from 'react-native-share';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {faShareFromSquare} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';

import KakaoShareLink from 'react-native-kakao-share-link';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';

type Props = {
  timer: any;
  coords: any;

  totalDist: any;
  totalHigh: any;
  today: any;
};

function TrackingEnd({timer, coords, totalDist, totalHigh, today}: Props) {
  const captureRef = useRef<any>(); // 캡쳐할 영역의 값을 가져오기 위한 ref

  // 지정된 영역 캡쳐해서 uri 생성
  const getPhotoUri = async (): Promise<string> => {
    const uri = await captureRef.current.capture();
    return uri;
  };

  // sns로 공유하는 함수
  const onCapture = async (social: any) => {
    try {
      const uri = await getPhotoUri();

      const options = {
        title: '등산 기록',
        message: `등산 시간: ${timer}, 총 거리: ${totalDist}, 총 고도: ${totalHigh}`,
        url: uri,
        type: 'image/jpeg',
      };

      // 소셜 타입 미지정 or 지정
      if (social === null) {
        const result = await Share.open(options);
        if (result.dismissedAction) {
          Alert.alert('공유 실패', '사진을 공유하는데 실패했습니다.');
        }
      } else {
        const result = await Share.shareSingle({
          ...options,
          social,
        });
      }
    } catch (e) {
      console.error('error', e);
    }
  };

  // 이미지를 저장하는 함수
  const onSave = async () => {
    const uri = await getPhotoUri();
    const result = await CameraRoll.save(uri);
    Alert.alert('이미지 저장', '갤러리에 이미지가 저장되었습니다. ');
  };

  const kakaoShare = async () => {
    try {
      const uri = await getPhotoUri();

      // 이미지 형식을 파일로 변경
      let file = '';
      fetch(uri)
        .then(response => response.blob())
        .then(myBlob => {
          const objectURL = URL.createObjectURL(myBlob);
          file = objectURL;
        });

      // 피드 형식으로 공유 (추후 수정 필요)
      const response = await KakaoShareLink.sendFeed({
        content: {
          title: '등산 기록',
          imageUrl: uri,
          link: {
            mobileWebUrl: 'http://j7b201.p.ssafy.io:8080/docs/index.html',
            webUrl: 'http://j7b201.p.ssafy.io:8080/docs/index.html',
            androidExecutionParams: [],
            iosExecutionParams: [],
          },
          description: `등산 시간: ${timer}, 총 거리: ${totalDist}, 총 고도: ${totalHigh}`,
        },
        buttons: [
          {
            title: '앱에서 보기',
            link: {
              mobileWebUrl: 'http://j7b201.p.ssafy.io:8080/docs/index.html',
              webUrl: 'http://j7b201.p.ssafy.io:8080/docs/index.html',
              androidExecutionParams: [],
              iosExecutionParams: [],
            },
          },
        ],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <AppTextBold style={styles.titleText}>등산 종료</AppTextBold>
      </View>
      <View>
        <ViewShot
          style={styles.mapContainer}
          ref={captureRef}
          options={{format: 'jpg', quality: 0.9}}>
          <ResultMap coords={coords} />
        </ViewShot>
      </View>
      <View style={styles.shareGroup}>
        <Pressable onPress={kakaoShare} style={styles.shareButton}>
          <AppText>카카오톡 공유하기</AppText>
        </Pressable>
        <Pressable onPress={() => onCapture(null)} style={styles.shareButton}>
          <FontAwesomeIcon icon={faShareFromSquare} size={15} />
        </Pressable>
        <Pressable onPress={onSave} style={styles.shareButton}>
          <FontAwesomeIcon icon={faDownload} size={15} />
        </Pressable>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textLabelGroup}>
          <AppText style={styles.text}>일시</AppText>
          <AppText style={styles.text}>장소</AppText>
          <AppText style={styles.text}>소요시간</AppText>
          <AppText style={styles.text}>총 거리</AppText>
          <AppText style={styles.text}>총 고도</AppText>
        </View>
        <View style={styles.textGroup}>
          <AppText style={styles.text}>{today}</AppText>
          <AppText style={styles.text}>대전광역시 계룡산</AppText>
          <AppText style={styles.text}>{timer}</AppText>
          <AppText style={styles.text}>{totalDist} km</AppText>
          <AppText style={styles.text}>{totalHigh} m</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
  title: {
    margin: 10,
  },
  titleText: {
    fontSize: 20,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  mapContainer: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  textContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  textLabelGroup: {
    flex: 0.3,
  },
  textGroup: {
    flex: 0.7,
  },
  text: {
    fontSize: 13,
    margin: 5,
  },
  shareGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  shareButton: {
    padding: 10,
  },
});
export default TrackingEnd;
