import React from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import Map from '../../components/hiking/Map';
import AppTextBold from '../../components/AppTextBold';
import {
  faCloud,
  faCloudRain,
  faSnowflake,
  faSun,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

interface Props {
  currentWeather: any;
  trailName: any;
  myPosition: any;
  setIsTracking: any;
  getLocation: any;
  setCoords: any;
  coords: any;
}

function TrackingStart({
  currentWeather,
  trailName,
  myPosition,
  setIsTracking,
  getLocation,
  setCoords,
  coords,
}: Props) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height - tabBarHeight,
        }}>
        <Map myPosition={myPosition} />
      </View>
      <View style={styles.textLabelGroup}>
        {currentWeather === '눈' ? (
          <FontAwesomeIcon
            icon={faSnowflake}
            size={15}
            color={'skyblue'}
            style={styles.weatherIcon}
          />
        ) : currentWeather === '흐림' ? (
          <FontAwesomeIcon
            icon={faCloud}
            size={15}
            color={'grey'}
            style={styles.weatherIcon}
          />
        ) : currentWeather === '비' ? (
          <FontAwesomeIcon
            icon={faCloudRain}
            size={15}
            color={'skyblue'}
            style={styles.weatherIcon}
          />
        ) : currentWeather === '바람' ? (
          <FontAwesomeIcon
            icon={faWind}
            size={15}
            color={'skyblue'}
            style={styles.weatherIcon}
          />
        ) : (
          <FontAwesomeIcon
            icon={faSun}
            size={15}
            color={'#FFCC29'}
            style={styles.weatherIcon}
          />
        )}
        <AppTextBold style={styles.trailText}>{trailName}</AppTextBold>
      </View>
      <View style={styles.startButtonView}>
        <Pressable
          style={styles.startButton}
          onPress={() => {
            setIsTracking(true);
            getLocation();
            setCoords([
              ...coords,
              {
                latitude: myPosition?.latitude,
                longitude: myPosition?.longitude,
              },
            ]);
          }}>
          <AppTextBold style={styles.buttonText}>출발</AppTextBold>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: Dimensions.get('window').width - 30,
    borderRadius: 30,
    paddingLeft: 20,
    paddingVertical: 15,
  },
  mapContainer: {
    width: Dimensions.get('window').width,
  },
  weatherIcon: {
    marginBottom: 5,
  },
  trailText: {
    fontSize: 15,
    marginHorizontal: 5,
  },
  startButtonView: {
    position: 'absolute',
    marginTop: 20,
    alignItems: 'center',
    top: Dimensions.get('window').height - 250,
    left: Dimensions.get('window').width / 2 - 45,
  },
  startButton: {
    width: 90,
    height: 90,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: '#57d696',
    paddingVertical: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default TrackingStart;
