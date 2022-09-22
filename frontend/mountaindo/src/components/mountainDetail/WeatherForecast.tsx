import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import axios from 'axios';

function WeatherForecast() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [todayDate, setDate] = useState(0); // 날짜
  const [todayDay, setDay] = useState(0); // 요일
  const [todayNum, setTodayNum] = useState(0);
  const [todayStr, setTodayStr] = useState('');
  const [weather0, setWeather0] = useState(0); // 오늘 날씨
  const [temp0, setTemp0] = useState(0); // 오늘 기온
  const [weather1, setWeather1] = useState(0); // 1일 뒤 날씨
  const [temp1, setTemp1] = useState(0); // 1일 뒤 기온
  const [weather2, setWeather2] = useState(0); // 2일 뒤 날씨
  const [temp2, setTemp2] = useState(0); // 2일 뒤 기온
  const [weather3, setWeather3] = useState(0); // 3일 뒤 날씨
  const [tempLow3, setTempLow3] = useState(0); // 3일 뒤 최저 기온
  const [tempHigh3, setTempHigh3] = useState(0); // 3일 뒤 최고 기온
  const [rain3, setRain3] = useState(0); // 3일 뒤 강수확률
  const [weather4, setWeather4] = useState(0); // 4일 뒤 날씨
  const [tempLow4, setTempLow4] = useState(0); // 4일 뒤 최저 기온
  const [tempHigh4, setTempHigh4] = useState(0); // 4일 뒤 최고 기온
  const [rain4, setRain4] = useState(0); // 4일 뒤 강수확률
  const [weather5, setWeather5] = useState(0); // 5일 뒤 날씨
  const [tempLow5, setTempLow5] = useState(0); // 5일 뒤 최저 기온
  const [tempHigh5, setTempHigh5] = useState(0); // 5일 뒤 최고 기온
  const [rain5, setRain5] = useState(0); // 5일 뒤 강수확률

  const dayList = ['일', '월', '화', '수', '목', '금', '토'];

  // 주간 날짜, 요일 구하는 함수
  const getDayAndDate = () => {
    let todayDigit = '';
    let today: any = new Date();
    console.log(today);
    let year: number = today.getFullYear();
    let month: number = today.getMonth();
    let date: number = today.getDate();
    let day: number = today.getDay();
    setDate(date);
    setDay(day); // 요일 => 일: 0, 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6
    todayDigit += year.toString();
    if (month + 1 < 10) {
      todayDigit += '0' + (month + 1).toString();
    } else {
      todayDigit += (month + 1).toString();
    }
    if (date < 10) {
      todayDigit += '0' + date.toString();
    } else {
      todayDigit += date.toString();
    }
    console.log(todayDigit);
    setTodayNum(parseInt(todayDigit, 10));
    setTodayStr(todayDigit);
    console.log(todayNum);
  };

  // 날짜별로 어떤 날씨인지 파악하는 함수
  // 1: 맑음, 2: 비, 3: 구름많음, 4: 흐림
  const getWeatherImage = (sky: number, pty: number, when: number) => {
    if (when === 0) {
      console.log(sky, pty);
      if (pty !== 0) {
        setWeather0(2); // 비옴
      } else if (pty === 0) {
        // 비 안옴
        if (sky === 1) {
          setWeather0(1);
        } else if (sky === 3) {
          setWeather0(3);
        } else if (sky === 4) {
          setWeather0(4);
        }
      }
    } else if (when === 1) {
      if (pty !== 0) {
        setWeather1(2); // 비옴
      } else if (pty === 0) {
        // 비 안옴
        if (sky === 1) {
          setWeather1(1);
        } else if (sky === 3) {
          setWeather1(3);
        } else if (sky === 4) {
          setWeather1(4);
        }
      }
    } else if (when === 2) {
      if (pty !== 0) {
        setWeather2(2); // 비옴
      } else if (pty === 0) {
        // 비 안옴
        if (sky === 1) {
          setWeather2(1);
        } else if (sky === 3) {
          setWeather2(3);
        } else if (sky === 4) {
          setWeather2(4);
        }
      }
    }
  };

  // 오늘, 내일, 모레까지의 기상 전망 데이터 받아서 state 세팅
  const getShortlyWeather = async () => {
    try {
      const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=EAowAGKGIIvxX0AOd1diW9rxD2iII7v10YdM3OFlWubmXTGINK3K%2FI4CXtjYT4aeqROUhnAIdM%2B%2BJwTFQGLHug%3D%3D&numOfRows=1500&pageNo=1&base_date=20220922&base_time=0500&nx=55&ny=127&dataType=JSON`;
      const response = await axios.get(url);
      let data: any = JSON.stringify(response);
      let item: any = JSON.parse(data).data.response.body.items.item;
      let sky: number = 0;
      let pty: number = 0;
      let sky1: number = 0;
      let pty1: number = 0;
      let sky2: number = 0;
      let pty2: number = 0;

      for (var i = 0; i < item.length; i++) {
        let baseDate: number = parseInt(item[i].baseDate, 10);
        let fcstDate: number = parseInt(item[i].fcstDate, 10);
        if (fcstDate === baseDate && item[i].fcstTime === '1000') {
          if (item[i].category === 'TMP') {
            setTemp0(parseInt(item[i].fcstValue, 10)); // 오늘 기온 세팅
          } else if (item[i].category === 'SKY') {
            sky = parseInt(item[i].fcstValue, 10);
            console.log('오늘 하늘', sky);
          } else if (item[i].category === 'PTY') {
            pty = parseInt(item[i].fcstValue, 10);
            console.log('오늘 비', pty);
            getWeatherImage(sky, pty, 0); // 오늘 날씨 세팅
          }
        } else if (fcstDate === baseDate + 1 && item[i].fcstTime === '1000') {
          if (item[i].category === 'TMP') {
            setTemp1(parseInt(item[i].fcstValue, 10)); // 1일 뒤기온 세팅
          } else if (item[i].category === 'SKY') {
            sky1 = parseInt(item[i].fcstValue, 10);
            console.log('1일 뒤 하늘', sky1);
          } else if (item[i].category === 'PTY') {
            pty1 = parseInt(item[i].fcstValue, 10);
            console.log('1일 뒤 비', pty1);
            getWeatherImage(sky1, pty1, 1);
          }
        } else if (fcstDate === baseDate + 2 && item[i].fcstTime === '1000') {
          if (item[i].category === 'TMP') {
            setTemp2(parseInt(item[i].fcstValue, 10)); // 1일 뒤 기온 세팅
          } else if (item[i].category === 'SKY') {
            sky2 = parseInt(item[i].fcstValue, 10);
            console.log('2일 뒤 하늘', sky2);
          } else if (item[i].category === 'PTY') {
            pty2 = parseInt(item[i].fcstValue, 10);
            console.log('2일 뒤 비', pty2);
            getWeatherImage(sky2, pty2, 2);
          }
        }
      }
    } catch (err) {
      Alert.alert('날씨 정보를 읽어올 수 없습니다.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 3일 후부터 5일 후까지 기상 전망 데이터 받아서 set state
  const getWeeklyWeather = async () => {
    try {
      const url =
        'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=EAowAGKGIIvxX0AOd1diW9rxD2iII7v10YdM3OFlWubmXTGINK3K%2FI4CXtjYT4aeqROUhnAIdM%2B%2BJwTFQGLHug%3D%3D&numOfRows=10&pageNo=1&regId=11B00000&tmFc=202209220600&dataType=JSON';
      const response = await axios.get(url);
      let data: any = JSON.stringify(response);
      let item: any = JSON.parse(data).data.response.body.items.item[0];
      console.log(item);
      // eslint-disable-next-line no-lone-blocks
      {
        item.wf3Am === '맑음'
          ? setWeather3(1)
          : item.wf3Am === '흐리고 비' || '구름많고 비'
          ? setWeather3(2)
          : setWeather3(3);
      }
      setRain3(item.rnSt3Am);
      // eslint-disable-next-line no-lone-blocks
      {
        item.wf4Am === '맑음'
          ? setWeather4(1)
          : item.wf4Am === '흐리고 비' || '구름많고 비'
          ? setWeather4(2)
          : setWeather4(3);
      }
      setRain4(item.rnSt4Am);
      // eslint-disable-next-line no-lone-blocks
      {
        item.wf5Am === '맑음'
          ? setWeather5(1)
          : item.wf5Am === '흐리고 비' || '구름많고 비'
          ? setWeather5(2)
          : setWeather5(3);
      }
      setRain5(item.rnSt5Am);
    } catch (err) {
      Alert.alert('날씨 정보를 읽어올 수 없습니다.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 3일 후부터 5일 후까지 기온 전망 데이터 받아서 set state
  const getWeeklyTemp = async () => {
    try {
      const url =
        'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=EAowAGKGIIvxX0AOd1diW9rxD2iII7v10YdM3OFlWubmXTGINK3K%2FI4CXtjYT4aeqROUhnAIdM%2B%2BJwTFQGLHug%3D%3D&numOfRows=10&pageNo=1&regId=11B00000&tmFc=202209220600&dataType=JSON';
      const response = await axios.get(url);
      let data: any = JSON.stringify(response);
      let item: any = JSON.parse(data).data.response.body.items.item[0];
      console.log(item);
      setTempLow3(item.taMin3);
      setTempHigh3(item.taMax3);
      setTempLow4(item.taMin4);
      setTempHigh4(item.taMax4);
      setTempLow5(item.taMin5);
      setTempHigh5(item.taMax5);
    } catch (err) {
      Alert.alert('날씨 정보를 읽어올 수 없습니다.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDayAndDate();
    getShortlyWeather();
    getWeeklyWeather();
    getWeeklyTemp();
  }, []);

  return (
    <View>
      <View style={styles.weatherWrapper}>
        <Text style={styles.weatherText}>주간 날씨 예보</Text>
        {isLoading || error ? (
          <Text>Loading</Text>
        ) : (
          <View style={styles.weatherImgWrapper}>
            <View>
              {/* 오늘 날씨 */}
              {weather0 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음, 4: 흐림
                <View>
                  <Text>{todayDate}</Text>
                  <Text>{dayList[todayDay]}</Text>
                  <Image source={require('../../assets/clear.jpg')} />
                  <Text>{temp0}</Text>
                </View>
              ) : weather0 === 2 ? (
                <View>
                  <Text>{todayDate}</Text>
                  <Text>{dayList[todayDay]}</Text>
                  <Image source={require('../../assets/rain.jpg')} />
                  <Text>{temp0}</Text>
                </View>
              ) : weather0 === 3 ? (
                <View>
                  <Text>{todayDate}</Text>
                  <Text>{dayList[todayDay]}</Text>
                  <Image source={require('../../assets/little-clouds.jpg')} />
                  <Text>{temp0}</Text>
                </View>
              ) : (
                <View>
                  <Text>{todayDate}</Text>
                  <Text>{dayList[todayDay]}</Text>
                  <Image source={require('../../assets/many-clouds.jpg')} />
                  <Text>{temp0}</Text>
                </View>
              )}
            </View>
            <View>
              {/* 1일 뒤 날씨 */}
              {weather1 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음, 4: 흐림
                <View>
                  <Text>{todayDate + 1}</Text>
                  <Text>{dayList[todayDay + 1]}</Text>
                  <Image source={require('../../assets/clear.jpg')} />
                  <Text>{temp1}</Text>
                </View>
              ) : weather1 === 2 ? (
                <View>
                  <Text>{todayDate + 1}</Text>
                  <Text>{dayList[todayDay + 1]}</Text>
                  <Image source={require('../../assets/rain.jpg')} />
                  <Text>{temp1}</Text>
                </View>
              ) : weather1 === 3 ? (
                <View>
                  <Text>{todayDate + 1}</Text>
                  <Text>{dayList[todayDay + 1]}</Text>
                  <Image source={require('../../assets/little-clouds.jpg')} />
                  <Text>{temp1}</Text>
                </View>
              ) : (
                <View>
                  <Text>{todayDate + 1}</Text>
                  <Text>{dayList[todayDay + 1]}</Text>
                  <Image source={require('../../assets/many-clouds.jpg')} />
                  <Text>{temp1}</Text>
                </View>
              )}
            </View>
            <View>
              {/* 2일 뒤 날씨 */}
              {weather2 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음, 4: 흐림
                <View>
                  <Text>{todayDate + 2}</Text>
                  {todayDay + 2 > 6 ? (
                    <Text>{dayList[todayDay - 5]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 2]}</Text>
                  )}
                  <Image source={require('../../assets/clear.jpg')} />
                  <Text>{temp2}</Text>
                </View>
              ) : weather2 === 2 ? (
                <View>
                  <Text>{todayDate + 2}</Text>
                  {todayDay + 2 > 6 ? (
                    <Text>{dayList[todayDay - 5]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 2]}</Text>
                  )}
                  <Image source={require('../../assets/rain.jpg')} />
                  <Text>{temp2}</Text>
                </View>
              ) : weather2 === 3 ? (
                <View>
                  <Text>{todayDate + 2}</Text>
                  {todayDay + 2 > 6 ? (
                    <Text>{dayList[todayDay - 5]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 2]}</Text>
                  )}
                  <Image source={require('../../assets/little-clouds.jpg')} />
                  <Text>{temp2}</Text>
                </View>
              ) : (
                <View>
                  <Text>{todayDate + 2}</Text>
                  {todayDay + 2 > 6 ? (
                    <Text>{dayList[todayDay - 5]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 2]}</Text>
                  )}
                  <Image source={require('../../assets/many-clouds.jpg')} />
                  <Text>{temp2}</Text>
                </View>
              )}
            </View>
            <View>
              {/* 3일 뒤 날씨 */}
              {weather3 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음
                <View>
                  <Text>{todayDate + 3}</Text>
                  {todayDay + 3 > 6 ? (
                    <Text>{dayList[todayDay - 4]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 3]}</Text>
                  )}
                  <Image source={require('../../assets/clear.jpg')} />
                  <Text>{tempLow3}</Text>
                  <Text>{tempHigh3}</Text>
                </View>
              ) : weather3 === 2 ? (
                <View>
                  <Text>{todayDate + 3}</Text>
                  {todayDay + 3 > 6 ? (
                    <Text>{dayList[todayDay - 4]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 3]}</Text>
                  )}
                  <Image source={require('../../assets/rain.jpg')} />
                  <Text>{tempLow3}</Text>
                  <Text>{tempHigh3}</Text>
                </View>
              ) : (
                <View>
                  <Text>{todayDate + 3}</Text>
                  {todayDay + 3 > 6 ? (
                    <Text>{dayList[todayDay - 4]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 3]}</Text>
                  )}
                  <Image source={require('../../assets/little-clouds.jpg')} />
                  <Text>{tempLow3}</Text>
                  <Text>{tempHigh3}</Text>
                </View>
              )}
            </View>
            <View>
              {/* 4일 뒤 날씨 */}
              {weather4 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음
                <View>
                  <Text>{todayDate + 4}</Text>
                  {todayDay + 4 > 6 ? (
                    <Text>{dayList[todayDay - 3]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 4]}</Text>
                  )}
                  <Image source={require('../../assets/clear.jpg')} />
                  <Text>{tempLow4}</Text>
                  <Text>{tempHigh4}</Text>
                </View>
              ) : weather4 === 2 ? (
                <View>
                  <Text>{todayDate + 3}</Text>
                  {todayDay + 4 > 6 ? (
                    <Text>{dayList[todayDay - 3]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 4]}</Text>
                  )}
                  <Image source={require('../../assets/rain.jpg')} />
                  <Text>{tempLow4}</Text>
                  <Text>{tempHigh4}</Text>
                </View>
              ) : (
                <View>
                  <Text>{todayDate + 4}</Text>
                  {todayDay + 4 > 6 ? (
                    <Text>{dayList[todayDay - 3]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 4]}</Text>
                  )}
                  <Image source={require('../../assets/little-clouds.jpg')} />
                  <Text>{tempLow4}</Text>
                  <Text>{tempHigh4}</Text>
                </View>
              )}
            </View>
            <View>
              {/* 5일 뒤 날씨 */}
              {weather5 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음
                <View>
                  <Text>{todayDate + 5}</Text>
                  {todayDay + 5 > 6 ? (
                    <Text>{dayList[todayDay - 2]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 5]}</Text>
                  )}
                  <Image source={require('../../assets/clear.jpg')} />
                  <Text>{tempLow5}</Text>
                  <Text>{tempHigh5}</Text>
                </View>
              ) : weather5 === 2 ? (
                <View>
                  <Text>{todayDate + 5}</Text>
                  {todayDay + 5 > 6 ? (
                    <Text>{dayList[todayDay - 2]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 5]}</Text>
                  )}
                  <Image source={require('../../assets/rain.jpg')} />
                  <Text>{tempLow5}</Text>
                  <Text>{tempHigh5}</Text>
                </View>
              ) : (
                <View>
                  <Text>{todayDate + 5}</Text>
                  {todayDay + 5 > 6 ? (
                    <Text>{dayList[todayDay - 2]}</Text>
                  ) : (
                    <Text>{dayList[todayDay + 5]}</Text>
                  )}
                  <Image source={require('../../assets/little-clouds.jpg')} />
                  <Text>{tempLow5}</Text>
                  <Text>{tempHigh5}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  weatherText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  weatherImgWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WeatherForecast;
