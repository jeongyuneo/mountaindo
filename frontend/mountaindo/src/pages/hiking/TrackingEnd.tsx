import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {LoggedInParamList} from '../../../AppInner';
import ResultMap from '../../components/hiking/ResultMap';
import Share from 'react-native-share';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {faShareFromSquare} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';

import KakaoShareLink from 'react-native-kakao-share-link';

type TrackingEndScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'TrackingEnd'
>;

function TrackingEnd({navigation, route}: TrackingEndScreenProps) {
  const today = JSON.stringify(new Date()).split('T')[0].replace('"', ''); // 날짜 데이터를 문자열로 가공
  const timer = route.params?.timer; // 총 시간 정보 Hiking 페이지에서 받아와서 저장
  const coords = route.params?.coords; // 전체 좌표값이 들어있는 리스트
  const totalDist = route.params?.totalDist ? route.params.totalDist : 0; // 총 거리
  const totalHigh = route.params?.totalHigh ? route.params.totalHigh : 0; // 고도 변화 값

  useEffect(() => {
    if (!timer || !coords || !totalDist || !totalHigh) {
      return;
    }
  }, [
    timer,
    route.params?.timer,
    coords,
    route.params?.coords,
    totalDist,
    route.params?.totalDist,
    totalHigh,
    route.params?.totalHigh,
  ]);
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
        // type: 'image/jpeg',
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

  const testKakaoShare = async () => {
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
          imageUrl: file,
          link: {
            mobileWebUrl: '[이미지를 클릭했을 때, 보낼 모바일 URL 정보]',
            webUrl: '[이미지를 클릭했을 때, 보낼 웹 URL 정보]',
          },
          description: `등산 시간: ${timer}, 총 거리: ${totalDist}, 총 고도: ${totalHigh}`,
        },
        buttons: [
          {
            title: '앱에서 보기',
            link: {
              mobileWebUrl: '[버튼을 클릭했을 때, 보낼 모바일 URL 정보]',
              webUrl: '[버튼을 클릭했을 때, 보낼 웹 URL 정보]',
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
        <Text style={styles.titleText}>등산 종료</Text>
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
        <Pressable onPress={testKakaoShare} style={styles.shareButton}>
          <Text>카카오톡 공유하기</Text>
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
          <Text style={styles.text}>일시</Text>
          <Text style={styles.text}>장소</Text>
          <Text style={styles.text}>소요시간</Text>
          <Text style={styles.text}>총 거리</Text>
          <Text style={styles.text}>총 고도</Text>
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.text}>{today}</Text>
          <Text style={styles.text}>대전광역시 계룡산</Text>
          <Text style={styles.text}>{timer}</Text>
          <Text style={styles.text}>{totalDist} km</Text>
          <Text style={styles.text}>{totalHigh} m</Text>
        </View>
      </View>
      <View style={styles.moveButton}>
        <Pressable
          onPress={() => navigation.navigate('Main')}
          style={styles.button}>
          <Text style={styles.buttonText}>메인페이지로 이동</Text>
        </Pressable>
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
    fontWeight: 'bold',
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
    fontWeight: '700',
    fontSize: 15,
  },
  moveButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'grey',
    width: 200,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
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
