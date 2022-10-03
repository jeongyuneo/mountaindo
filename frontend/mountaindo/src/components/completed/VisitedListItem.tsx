import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
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
}

function VisitedListItem({
  hikingId,
  trailName,
  lastHikingDate,
  useTime,
  level,
  mountainName,
  moveToVisitedDetail,
}: Props) {
  return (
    // 개별 아이템 클릭 시 디테일페이지로 이동(등산로 정보, 산 이름, 주소 정보 포함)
    <Pressable
      style={styles.wrapper}
      onPress={() => {
        moveToVisitedDetail(hikingId);
      }}>
      <View style={styles.imageContentWrapper}>
        <Image
          source={require('../../assets/gyeryongMountain.jpg')}
          style={styles.image}
        />
        <View style={styles.contentWrapper}>
          <View style={styles.titleContainer}>
            <AppTextBold style={styles.nameText}>{trailName}</AppTextBold>
            {level === '하' ? (
              <>
                <FontAwesomeIcon icon={faStar} size={15} color={'yellow'} />
                <FontAwesomeIcon
                  icon={regularStar}
                  size={15}
                  color={'yellow'}
                />
                <FontAwesomeIcon
                  icon={regularStar}
                  size={15}
                  color={'yellow'}
                />
              </>
            ) : level === '중' ? (
              <>
                <FontAwesomeIcon icon={faStar} size={15} color={'yellow'} />
                <FontAwesomeIcon icon={faStar} size={15} color={'yellow'} />
                <FontAwesomeIcon
                  icon={regularStar}
                  size={15}
                  color={'yellow'}
                />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faStar} size={15} color={'yellow'} />
                <FontAwesomeIcon icon={faStar} size={15} color={'yellow'} />
                <FontAwesomeIcon icon={faStar} size={15} color={'yellow'} />
              </>
            )}
          </View>
          <View style={styles.contentsContainer}>
            <AppText style={styles.mountainName}>{lastHikingDate}</AppText>
            <AppText style={styles.mountainName}>{mountainName}</AppText>
          </View>
          <AppText style={styles.heightText}>소요 시간: {useTime}</AppText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  wrapper: {
    marginVertical: 5,
    borderRadius: 20,
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
    marginLeft: 20,
  },
  nameText: {
    fontSize: 18,
    marginRight: 5,
  },
  image: {
    height: 60,
    width: 80,
    borderRadius: 15,
  },
  heightText: {
    fontSize: 12,
    marginTop: 5,
  },
  mountainName: {
    fontSize: 12,
  },
});

export default VisitedListItem;
