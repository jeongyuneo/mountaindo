import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import AppTextBold from '../AppTextBold';
import AppText from '../AppText';
import {
  ShortlyWeatherLocation,
  TemperatureLocation,
  WeatherLocation,
} from './WeatherLocation';

interface Props {
  location: string;
}

function WeatherForecast({location}: Props) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [weatherCode, setWeatherCode] = useState('');
  const [tempCode, setTempCode] = useState('');
  const [todayDate, setDate] = useState(0); // 날짜
  const [todayDay, setDay] = useState(0); // 요일
  const [date1After, setDate1After] = useState(0); // 1일 뒤 날짜
  const [date2After, setDate2After] = useState(0); // 2일 뒤 날짜
  const [date3After, setDate3After] = useState(0); // 3일 뒤 날짜
  const [date4After, setDate4After] = useState(0); // 4일 뒤 날짜
  const [date5After, setDate5After] = useState(0); // 5일 뒤 날짜
  const [oneDayAfter, setOneDayAfter] = useState(0); // 1일 뒤 날짜 숫자 8자리
  const [twoDayAfter, setTwoDayAfter] = useState(0); // 2일 뒤 날짜 숫자 8자리
  const [todayNum, setTodayNum] = useState(0); // 오늘 날짜 숫자 8자리
  const [weather0, setWeather0] = useState(0); // 오늘 날씨
  const [tempLow0, setTempLow0] = useState(0); // 오늘 최저 기온
  const [tempHigh0, setTempHigh0] = useState(0); // 오늘 최고 기온
  const [rain0, setRain0] = useState(0); // 오늘 강수 확률
  const [weather1, setWeather1] = useState(0); // 1일 뒤 날씨
  const [tempLow1, setTempLow1] = useState(0); // 1일 뒤 최저 기온
  const [tempHigh1, setTempHigh1] = useState(0); // 1일 뒤 최고 기온
  const [rain1, setRain1] = useState(0); // 1일 뒤 강수 확률
  const [weather2, setWeather2] = useState(0); // 2일 뒤 날씨
  const [tempLow2, setTempLow2] = useState(0); // 2일 뒤 최저 기온
  const [tempHigh2, setTempHigh2] = useState(0); // 2일 뒤 최고 기온
  const [rain2, setRain2] = useState(0); // 2일 뒤 강수 확률
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

  // 날씨 API 키 가져오기
  const API_KEY = Config.WEATHER_API_KEY;

  // 산 위치 코드 가져오기
  const getLocationCode = () => {
    ShortlyWeatherLocation.map(item => {
      if (item.value === location) {
        setX(item.x.toString());
        setY(item.y.toString());
      }
    });
    WeatherLocation.map(item => {
      if (item.value === location) {
        setWeatherCode(item.code);
      }
    });
    TemperatureLocation.map(item => {
      if (item.value === location) {
        setTempCode(item.code);
      }
    });
  };

  // 주간 날짜, 요일 구하는 함수
  const getDayAndDate = () => {
    let todayDigit = '';
    let today: any = new Date();
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
    setTodayNum(parseInt(todayDigit, 10));

    // 하루 뒤 날짜 구하기
    let oneDayAfterStr = '';
    let year1: number = addDays(today, 1).getFullYear();
    let month1: number = addDays(today, 1).getMonth();
    let date1: number = addDays(today, 1).getDate();
    setDate1After(date1);
    oneDayAfterStr += year1.toString();
    if (month1 + 1 < 10) {
      oneDayAfterStr += '0' + (month1 + 1).toString();
    } else {
      oneDayAfterStr += (month1 + 1).toString();
    }
    if (date1 < 10) {
      oneDayAfterStr += '0' + date1.toString();
    } else {
      oneDayAfterStr += date1.toString();
    }
    setOneDayAfter(parseInt(oneDayAfterStr, 10));

    // 2일 뒤 날짜 구하기
    let twoDayAfterStr = '';
    let year2: number = addDays(today, 2).getFullYear();
    let month2: number = addDays(today, 2).getMonth();
    let date2: number = addDays(today, 2).getDate();
    setDate2After(date2);
    twoDayAfterStr += year2.toString();
    if (month2 + 1 < 10) {
      twoDayAfterStr += '0' + (month2 + 1).toString();
    } else {
      twoDayAfterStr += (month2 + 1).toString();
    }
    if (date2 < 10) {
      twoDayAfterStr += '0' + date2.toString();
    } else {
      twoDayAfterStr += date2.toString();
    }
    setTwoDayAfter(parseInt(twoDayAfterStr, 10));

    // 3일 뒤 날짜 구하기
    let date3: number = addDays(today, 3).getDate();
    setDate3After(date3);

    // 4일 뒤 날짜 구하기
    let date4: number = addDays(today, 4).getDate();
    setDate4After(date4);

    // 5일 뒤 날짜 구하기
    let date5: number = addDays(today, 5).getDate();
    setDate5After(date5);
  };

  // 날짜 더하는 함수
  const addDays: any = (date: any, days: number) => {
    const clone = new Date(date);
    clone.setDate(date.getDate() + days);
    return clone;
  };

  // 날짜별로 어떤 날씨인지 파악하는 함수
  // 1: 맑음, 2: 비, 3: 구름많음, 4: 흐림
  const getWeatherImage = (sky: number, pty: number, when: number) => {
    if (when === 0) {
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
      const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&numOfRows=1500&pageNo=1&base_date=${todayNum}&base_time=0500&nx=${x}&ny=${y}&dataType=JSON`;
      const response = await axios.get(url);
      let data: any = JSON.stringify(response);
      let item: any = JSON.parse(data).data.response.body.items.item;
      let sky: number = 0; // 하늘 상태
      let pty: number = 0; // 강수 형태
      let sky1: number = 0;
      let pty1: number = 0;
      let sky2: number = 0;
      let pty2: number = 0;

      for (let i = 0; i < item.length; i++) {
        let baseDate: number = parseInt(item[i].baseDate, 10);
        let fcstDate: number = parseInt(item[i].fcstDate, 10);
        if (fcstDate === baseDate) {
          if (item[i].fcstTime === '0600') {
            if (item[i].category === 'TMP') {
              setTempLow0(parseInt(item[i].fcstValue, 10)); // 오늘 최저 기온 세팅
            }
          } else if (item[i].fcstTime === '1000') {
            if (item[i].category === 'SKY') {
              sky = parseInt(item[i].fcstValue, 10);
            } else if (item[i].category === 'PTY') {
              pty = parseInt(item[i].fcstValue, 10);
              getWeatherImage(sky, pty, 0); // 오늘 날씨 세팅
            } else if (item[i].category === 'POP') {
              setRain0(parseInt(item[i].fcstValue, 10)); // 오늘 강수 확률 세팅
            }
          } else if (item[i].fcstTime === '1400') {
            if (item[i].category === 'TMP') {
              setTempHigh0(parseInt(item[i].fcstValue, 10)); // 오늘 최고 기온 세팅
            }
          }
        } else if (fcstDate === oneDayAfter) {
          if (item[i].fcstTime === '0600') {
            if (item[i].category === 'TMP') {
              setTempLow1(parseInt(item[i].fcstValue, 10)); // 1일 뒤 최저 기온 세팅
            }
          } else if (item[i].fcstTime === '1000') {
            if (item[i].category === 'SKY') {
              sky1 = parseInt(item[i].fcstValue, 10);
            } else if (item[i].category === 'PTY') {
              pty1 = parseInt(item[i].fcstValue, 10);
              getWeatherImage(sky1, pty1, 1); // 1일 뒤 날씨 세팅
            } else if (item[i].category === 'POP') {
              setRain1(parseInt(item[i].fcstValue, 10)); // 1일 뒤 강수 확률 세팅
            }
          } else if (item[i].fcstTime === '1400') {
            if (item[i].category === 'TMP') {
              setTempHigh1(parseInt(item[i].fcstValue, 10)); // 1일 뒤 최고 기온 세팅
            }
          }
        } else if (fcstDate === twoDayAfter) {
          if (item[i].fcstTime === '0600') {
            if (item[i].category === 'TMP') {
              setTempLow2(parseInt(item[i].fcstValue, 10)); // 2일 뒤 최저 기온 세팅
            }
          } else if (item[i].fcstTime === '1000') {
            if (item[i].category === 'SKY') {
              sky2 = parseInt(item[i].fcstValue, 10);
            } else if (item[i].category === 'PTY') {
              pty2 = parseInt(item[i].fcstValue, 10);
              getWeatherImage(sky2, pty2, 2); // 2일 뒤 날씨 세팅
            } else if (item[i].category === 'POP') {
              setRain2(parseInt(item[i].fcstValue, 10)); // 2일 뒤 강수 확률 세팅
            }
          } else if (item[i].fcstTime === '1400') {
            if (item[i].category === 'TMP') {
              setTempHigh2(parseInt(item[i].fcstValue, 10)); // 2일 뒤 최고 기온 세팅
            }
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
      const url = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&regId=${weatherCode}&tmFc=${todayNum}0600&dataType=JSON`;
      const response = await axios.get(url);
      let data: any = JSON.stringify(response);
      let item: any = JSON.parse(data).data.response.body.items.item[0];
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
      const url = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&regId=${tempCode}&tmFc=${todayNum}0600&dataType=JSON`;
      const response = await axios.get(url);
      let data: any = JSON.stringify(response);
      let item: any = JSON.parse(data).data.response.body.items.item[0];
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
    getLocationCode();
    if (todayNum === 0 || !x || !y || !weatherCode || !tempCode) {
      return;
    }
    getShortlyWeather();
    getWeeklyWeather();
    getWeeklyTemp();
  }, [todayNum, x, y, weatherCode, tempCode]);

  useEffect(() => {
    getLocationCode();
  }, []);

  return (
    <View>
      <View style={styles.weatherWrapper}>
        <View style={styles.weatherInnerWrapper}>
          {isLoading || error ? (
            <AppTextBold>Loading</AppTextBold>
          ) : (
            <View style={styles.weatherComponentWrapper}>
              <View>
                {/* 오늘 날씨 */}
                {weather0 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음, 4: 흐림
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{todayDate}</AppText>
                      <AppText style={styles.dayText}>
                        {dayList[todayDay]}
                      </AppText>
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/sunny.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain0}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow0}℃ / {tempHigh0}℃
                    </AppText>
                  </View>
                ) : weather0 === 2 ? (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{todayDate}</AppText>
                      <AppText style={styles.dayText}>
                        {dayList[todayDay]}
                      </AppText>
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/rainy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain0}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow0}℃ / {tempHigh0}℃
                    </AppText>
                  </View>
                ) : weather0 === 3 ? (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{todayDate}</AppText>
                      <AppText style={styles.dayText}>
                        {dayList[todayDay]}
                      </AppText>
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/cloudy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain0}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow0}℃ / {tempHigh0}℃
                    </AppText>
                  </View>
                ) : (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{todayDate}</AppText>
                      <AppText style={styles.dayText}>
                        {dayList[todayDay]}
                      </AppText>
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/tooCloudy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain0}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow0}℃ / {tempHigh0}℃
                    </AppText>
                  </View>
                )}
              </View>
              <View>
                {/* 1일 뒤 날씨 */}
                {weather1 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음, 4: 흐림
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date1After}</AppText>
                      <AppText style={styles.dayText}>
                        {dayList[todayDay + 1]}
                      </AppText>
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/sunny.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain1}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow1}℃ / {tempHigh1}℃
                    </AppText>
                  </View>
                ) : weather1 === 2 ? (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date1After}</AppText>
                      <AppText style={styles.dayText}>
                        {dayList[todayDay + 1]}
                      </AppText>
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/rainy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain1}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow1}℃ / {tempHigh1}℃
                    </AppText>
                  </View>
                ) : weather1 === 3 ? (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date1After}</AppText>
                      <AppText style={styles.dayText}>
                        {dayList[todayDay + 1]}
                      </AppText>
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/cloudy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain1}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow1}℃ / {tempHigh1}℃
                    </AppText>
                  </View>
                ) : (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date1After}</AppText>
                      <AppText style={styles.dayText}>
                        {dayList[todayDay + 1]}
                      </AppText>
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/tooCloudy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain1}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow1}℃ / {tempHigh1}℃
                    </AppText>
                  </View>
                )}
              </View>
              <View>
                {/* 2일 뒤 날씨 */}
                {weather2 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음, 4: 흐림
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date2After}</AppText>
                      {todayDay + 2 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 5]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 2]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/sunny.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain2}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow2}℃ / {tempHigh2}℃
                    </AppText>
                  </View>
                ) : weather2 === 2 ? (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date2After}</AppText>
                      {todayDay + 2 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 5]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 2]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/rainy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain2}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow2}℃ / {tempHigh2}℃
                    </AppText>
                  </View>
                ) : weather2 === 3 ? (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date2After}</AppText>
                      {todayDay + 2 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 5]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 2]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/cloudy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain2}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow2}℃ / {tempHigh2}℃
                    </AppText>
                  </View>
                ) : (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date2After}</AppText>
                      {todayDay + 2 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 5]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 2]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/tooCloudy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain2}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow2}℃ / {tempHigh2}℃
                    </AppText>
                  </View>
                )}
              </View>
              <View>
                {/* 3일 뒤 날씨 */}
                {weather3 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date3After}</AppText>
                      {todayDay + 3 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 4]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 3]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/sunny.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain3}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow3}℃ / {tempHigh3}℃
                    </AppText>
                  </View>
                ) : weather3 === 2 ? (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date3After}</AppText>
                      {todayDay + 3 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 4]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 3]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/rainy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain3}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow3}℃ / {tempHigh3}℃
                    </AppText>
                  </View>
                ) : (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date3After}</AppText>
                      {todayDay + 3 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 4]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 3]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/cloudy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain3}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow3}℃ / {tempHigh3}℃
                    </AppText>
                  </View>
                )}
              </View>
              <View>
                {/* 4일 뒤 날씨 */}
                {weather4 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date4After}</AppText>
                      {todayDay + 4 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 3]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 4]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/sunny.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain4}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow4}℃ / {tempHigh4}℃
                    </AppText>
                  </View>
                ) : weather4 === 2 ? (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date4After}</AppText>
                      {todayDay + 4 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 3]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 4]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/rainy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain4}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow4}℃ / {tempHigh4}℃
                    </AppText>
                  </View>
                ) : (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date4After}</AppText>
                      {todayDay + 4 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 3]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 4]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/cloudy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain4}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow4}℃ / {tempHigh4}℃
                    </AppText>
                  </View>
                )}
              </View>
              <View>
                {/* 5일 뒤 날씨 */}
                {weather5 === 1 ? ( // 1: 맑음, 2: 비, 3: 구름많음
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date5After}</AppText>
                      {todayDay + 5 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 2]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 5]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/sunny.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain5}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow5}℃ / {tempHigh5}℃
                    </AppText>
                  </View>
                ) : weather5 === 2 ? (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date5After}</AppText>
                      {todayDay + 5 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 2]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 5]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/rainy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain5}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow5}℃ / {tempHigh5}℃
                    </AppText>
                  </View>
                ) : (
                  <View>
                    <View style={styles.dateDayWrapper}>
                      <AppText style={styles.dateText}>{date5After}</AppText>
                      {todayDay + 5 > 6 ? (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay - 2]}
                        </AppText>
                      ) : (
                        <AppText style={styles.dayText}>
                          {dayList[todayDay + 5]}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.weatherImgWrapper}>
                      <Image
                        source={require('../../assets/cloudy.png')}
                        style={styles.weatherImg}
                      />
                    </View>
                    <View style={styles.rainWrapper}>
                      <AppText style={styles.rainText}>{rain5}%</AppText>
                    </View>
                    <AppText style={styles.lowTempText}>
                      {tempLow5}℃ / {tempHigh5}℃
                    </AppText>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherWrapper: {
    backgroundColor: 'rgba(23, 23, 23, 0.4)',
  },
  weatherInnerWrapper: {
    padding: 10,
  },
  weatherComponentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherComponent: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
  },
  weatherText: {
    fontSize: 20,
  },
  dateDayWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  dayText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherImgWrapper: {
    alignItems: 'center',
  },
  weatherImg: {
    width: 25,
    height: 25,
  },
  lowTempText: {
    fontSize: 9,
    color: 'white',
    fontWeight: 'bold',
  },
  rainWrapper: {
    alignItems: 'center',
  },
  rainText: {
    fontSize: 9,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WeatherForecast;
