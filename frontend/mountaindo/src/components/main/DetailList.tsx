import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

interface Props {
  DummyMountain: {
    id: number;
    name: string;
    meter: number;
    now: string;
    profile: any;
    fire: any;
    cnt: number;
  }[];
}

function DetailList({DummyMountain}: Props) {
  return (
    <View>
      {DummyMountain.map(item => (
        <Pressable
          onPress={() => {
            Alert.alert(`${item.name}`, `${item.name}의 상세페이지로 이동`);
          }}>
          <View key={item.id} style={styles.listSetting}>
            <View>
              <View style={{flex: 0.9}}>
                <View style={{flexDirection: 'row'}}>
                  {item.cnt >= 300 ? (
                    <Image source={item.fire} style={styles.imgStyleFire} />
                  ) : (
                    <></>
                  )}
                  <Text style={styles.mountainName}>{item.name}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.content}>고도 : {item.meter}m</Text>
                <Text style={styles.content}>위치 : {item.now}</Text>
              </View>
            </View>
            <View>
              <Image source={item.profile} style={styles.imgStyle} />
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  imgStyleFire: {
    width: 20,
    height: 20,
    marginTop: 3,
    marginRight: 3,
  },
  content: {
    color: 'black',
    fontWeight: 'normal',
    paddingBottom: 3,
  },
  mountainName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 3,
  },
  imgStyle: {
    width: 90,
    height: 90,
    marginBottom: 5,
  },
  listSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 7,
    borderBottomWidth: 1,
  },
});

export default DetailList;
