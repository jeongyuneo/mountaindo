import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {dummyFilter} from './MainModal';

interface Props {
  goAllRank: any;
}
function MainRankList({goAllRank}) {
  let num = 1;
  return (
    <View>
      <View>
        <View style={styles.rankHeader}>
          <Text style={styles.rankTitle}>MountainDo 전체랭킹</Text>
          <View style={styles.goModal}>
            <Text style={styles.rankAll} onPress={goAllRank}>
              전체 랭키 보기
            </Text>
            <FontAwesomeIcon
              icon={faAngleDown}
              size={12}
              style={styles.angleDown}
            />
          </View>
        </View>
        <View>
          <Text style={styles.rankSubTitle}>
            랭킹은 등산 누적 고도를 기반으로 결정됩니다.
          </Text>
        </View>
      </View>

      <View>
        {dummyFilter.map(item => (
          <View key={item.id} style={styles.rankList}>
            <View style={styles.styleRow}>
              <Text style={styles.rankNum}>{num++}</Text>
              <View style={styles.styleRow}>
                <Image source={item.profile} style={styles.imgStyle} />
                <View style={styles.styleRow}>
                  <Text style={styles.nameStyle}>{item.name}</Text>
                  <Text style={styles.namePix}>님</Text>
                </View>
              </View>
            </View>
            <Text style={styles.meter}>{item.meter}m</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  angleDown: {
    marginTop: 3,
    marginLeft: 2,
  },
  goModal: {
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 3,
    color: 'gray',
  },
  styleRow: {
    flexDirection: 'row',
  },
  rankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rankTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 3,
  },
  rankAll: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  rankSubTitle: {
    fontSize: 11,
    marginLeft: 3,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  rankList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    marginHorizontal: 10,
  },
  imgStyle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 0.7,
    borderColor: 'gray',
    borderStyle: 'solid',
    marginRight: 5,
  },
  rankNum: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  nameStyle: {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 3,
    fontSize: 13,
  },
  namePix: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
    fontSize: 15,
  },
  meter: {
    fontWeight: 'bold',
    color: 'black',
  },
});
export default MainRankList;
