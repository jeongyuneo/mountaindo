import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';

type MountainScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'Mountain'
>;

function MountainDetail({navigation}: MountainScreenProps) {
  const [isLoading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState('');
  const [error, setError] = useState(false);

  const API_KEY = Config.WEATHER_API_KEY;

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const longitude = JSON.stringify(position.coords.longitude);
        const latitude = JSON.stringify(position.coords.latitude);
        console.log('location: ', latitude, longitude);
        getWeatherByCurrentLocation(latitude, longitude);
      },
      err => Alert.alert(err.message),
    );
  };

  const getWeatherByCurrentLocation = async (latitude: any, longitude: any) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      let data: any = JSON.stringify(response);
      console.log('data', data);
      let mainWeather = JSON.parse(data).data.weather[0].description;
      console.log('mainWeather', mainWeather);
      setCurrentWeather(mainWeather);
    } catch (err) {
      Alert.alert('날씨 정보를 읽어올 수 없습니다.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View>
      <Image
        style={styles.mountainImg}
        source={require('../../assets/gyeryongMountain.jpg')}
      />
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>계룡산</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.locationText}>위치: 대전 광역시 유성구</Text>
        <Text style={styles.altitudeText}>고도: 800m</Text>
      </View>
      <View style={styles.weatherWrapper}>
        <Text style={styles.weatherText}>주간 날씨 예보</Text>
        {isLoading || error ? (
          <Text>Loading</Text>
        ) : (
          <Text>{currentWeather}</Text>
        )}
      </View>

      <Text style={styles.courseText}>코스 목록</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mountainImg: {
    width: '100%',
    height: 200,
  },
  titleWrapper: {
    marginLeft: 20,
  },
  titleText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoWrapper: {
    marginLeft: 20,
    marginTop: 20,
  },
  locationText: {
    fontWeight: 'bold',
  },
  altitudeText: {
    fontWeight: 'bold',
  },
  weatherWrapper: {
    marginTop: 20,
    marginLeft: 20,
  },
  weatherText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  courseText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
    marginTop: 20,
  },
});

export default MountainDetail;
