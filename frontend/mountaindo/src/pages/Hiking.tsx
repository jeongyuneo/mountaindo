import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import NaverMapView, {LayerGroup, Marker, Path} from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';

type HikingScreenProps = NativeStackScreenProps<LoggedInParamList, 'Hiking'>;

function Hiking({navigation}: HikingScreenProps) {
  const mapView = useRef<any>(null); // NaverMapView의 설정을 바꾸기 위해 ref 설정 변수
  // 내 현재 위치를 저장할 변수
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    // watchPosition 사용자의 위치를 지속적으로 tracking
    // getCurrentPosition 사용자의 현재 위치
    Geolocation.watchPosition(
      info => {
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        // 몇 미터마다 사용자의 위치를 체크할 것인지 설정
        distanceFilter: 50,
      },
    );
  }, []);

  // 현재 위치를 받아오지 못했을 경우
  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }

  // 시작지점과 도착지점 임의의 경도, 위도 값으로 설정
  const start = {latitude: 36.354946759143, longitude: 127.29980994578};
  const end = {latitude: 36.358303220416, longitude: 127.30157350178};

  return (
    <View>
      <View
        // 화면 전체를 차지하도록 설정
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
        <NaverMapView
          ref={mapView}
          style={{width: '100%', height: '100%'}}
          zoomControl={false}
          // 지도의 label 설정 -> 등산로 정보 보이도록 설정
          onInitialized={() => {
            mapView.current.setLayerGroupEnabled(
              LayerGroup.LAYER_GROUP_MOUNTAIN,
              true,
            );
          }}
          center={{
            zoom: 15,
            tilt: 50,
            latitude: (start.latitude + end.latitude) / 2,
            longitude: (start.longitude + end.longitude) / 2,
          }}>
          {myPosition?.latitude && (
            <Marker
              coordinate={{
                latitude: myPosition.latitude,
                longitude: myPosition.longitude,
              }}
              width={15}
              height={15}
              anchor={{x: 0.5, y: 0.5}}
              caption={{text: '나'}}
              image={require('../assets/red-dot.png')}
            />
          )}
          {myPosition?.latitude && (
            <Path
              coordinates={[
                {
                  latitude: myPosition.latitude,
                  longitude: myPosition.longitude,
                },
                {latitude: start.latitude, longitude: start.longitude},
              ]}
              color="orange"
            />
          )}
          <Marker
            coordinate={{
              latitude: start.latitude,
              longitude: start.longitude,
            }}
            width={15}
            height={15}
            anchor={{x: 0.5, y: 0.5}}
            caption={{text: '출발'}}
            image={require('../assets/blue-dot.png')}
          />
          <Path
            coordinates={[
              {
                latitude: start.latitude,
                longitude: start.longitude,
              },
              {latitude: end.latitude, longitude: end.longitude},
            ]}
            color="orange"
          />
          <Marker
            coordinate={{latitude: end.latitude, longitude: end.longitude}}
            width={15}
            height={15}
            anchor={{x: 0.5, y: 0.5}}
            caption={{text: '도착'}}
            image={require('../assets/green-dot.png')}
            onClick={() => {
              console.log(navigation);
            }}
          />
        </NaverMapView>
      </View>
    </View>
  );
}

export default Hiking;
