import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';

interface Props {
  hikingId: number;
  trailName: string;
  lastHikingDate: string;
  useTime: string;
  level: string;
  mountainName: string;
  moveToVisitedDetail: any;
  imageUrl: string;
}

function VisitedListItem({
  hikingId,
  trailName,
  lastHikingDate,
  useTime,
  level,
  mountainName,
  moveToVisitedDetail,
  imageUrl,
}: Props) {
  return (
    // 개별 아이템 클릭 시 디테일페이지로 이동(등산로 정보, 산 이름, 주소 정보 포함)
    <Pressable
      style={styles.wrapper}
      onPress={() => {
        moveToVisitedDetail(hikingId);
      }}>
      <View style={styles.imageContentWrapper}>
        <View>
          <View style={styles.iconWrapper}>
            {level === '하' ? (
              <>
                <FontAwesomeIcon icon={faStar} size={12} color={'#FFD365'} />
                <FontAwesomeIcon
                  icon={regularStar}
                  size={12}
                  color={'#FFD365'}
                />
                <FontAwesomeIcon
                  icon={regularStar}
                  size={12}
                  color={'#FFD365'}
                />
              </>
            ) : level === '중' ? (
              <>
                <FontAwesomeIcon icon={faStar} size={12} color={'#FFD365'} />
                <FontAwesomeIcon icon={faStar} size={12} color={'#FFD365'} />
                <FontAwesomeIcon
                  icon={regularStar}
                  size={12}
                  color={'#FFD365'}
                />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faStar} size={12} color={'#FFD365'} />
                <FontAwesomeIcon icon={faStar} size={12} color={'#FFD365'} />
                <FontAwesomeIcon icon={faStar} size={12} color={'#FFD365'} />
              </>
            )}
          </View>
          {imageUrl !== null ? (
            <Image
              source={{uri: Config.REACT_APP_BE_HOST + imageUrl}}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../assets/mountainOne.jpeg')}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.titleContainer}>
            <AppText style={styles.mountainName}>{mountainName}</AppText>
            <AppTextBold style={styles.nameText}>{trailName}</AppTextBold>
          </View>
          <View style={styles.contentsContainer}>
            <AppText style={styles.mountainName}>소요 시간: {useTime}</AppText>
          </View>
          <AppText style={styles.heightText}>{lastHikingDate}</AppText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 7,
  },
  wrapper: {
    marginVertical: 5,
    borderRadius: 20,
    paddingRight: 40,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5,
    elevation: 5,
  },
  imageContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    marginLeft: 15,
    flexShrink: 1,
  },
  nameText: {
    fontSize: 12,
    marginLeft: 5,
    flexShrink: 0,
  },
  image: {
    height: 60,
    width: 80,
    borderRadius: 15,
  },
  heightText: {
    fontSize: 10,
    marginTop: 5,
  },
  mountainName: {
    fontSize: 12,
  },
  iconWrapper: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default VisitedListItem;
