import React from 'react';
import {View, StyleSheet, ScrollView, Image, Pressable} from 'react-native';
import Config from 'react-native-config';
import {RecommendType} from '../../pages/Main';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';

interface Props {
  recommend: string;
  lastVisitedTrailBased?: RecommendType[];
  memberBased?: RecommendType[];
  surveyBased?: RecommendType[];
  dispatchMountainDetail: any;
}

function EasyMountain({
  recommend,
  lastVisitedTrailBased,
  memberBased,
  surveyBased,
  dispatchMountainDetail,
}: Props) {
  return (
    <View>
      <ScrollView horizontal={true}>
        {recommend === 'lastVisitedTrailBased' &&
          !!lastVisitedTrailBased &&
          lastVisitedTrailBased?.length > 0 &&
          lastVisitedTrailBased.map((item, index) => (
            <Pressable
              onPress={dispatchMountainDetail(item.mountainId)}
              key={index}>
              <AppTextBold style={styles.mountainCourse}>
                {item.trailName}
              </AppTextBold>
              <Image
                source={{
                  uri: `${Config.REACT_APP_BE_HOST}${item.mountainImage}`,
                }}
                style={styles.imgStyle}
              />
              <AppText style={styles.mountainTitle}>
                {item.mountainName}
              </AppText>
            </Pressable>
          ))}
        {recommend === 'memberBased' &&
          !!memberBased &&
          memberBased?.length > 0 &&
          memberBased.map((item, index) => (
            <Pressable
              onPress={dispatchMountainDetail(item.mountainId)}
              key={index}>
              <AppTextBold style={styles.mountainCourse}>
                {item.trailName}
              </AppTextBold>
              <Image
                source={{
                  uri: `${Config.REACT_APP_BE_HOST}${item.mountainImage}`,
                }}
                style={styles.imgStyle}
              />
              <AppText style={styles.mountainTitle}>
                {item.mountainName}
              </AppText>
            </Pressable>
          ))}
        {recommend === 'surveyBased' &&
          !!surveyBased &&
          surveyBased?.length > 0 &&
          surveyBased.map((item, index) => (
            <Pressable
              onPress={dispatchMountainDetail(item.mountainId)}
              key={index}>
              <AppTextBold style={styles.mountainCourse}>
                {item.trailName}
              </AppTextBold>
              <Image
                source={{
                  uri: `${Config.REACT_APP_BE_HOST}${item.mountainImage}`,
                }}
                style={styles.imgStyle}
              />
              <AppText style={styles.mountainTitle}>
                {item.mountainName}
              </AppText>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mountainCourse: {
    fontSize: 12,
    marginLeft: 8,
  },
  mountainTitle: {
    fontSize: 10,
    marginLeft: 5,
    marginBottom: 7,
  },

  imgStyle: {
    width: 90,
    height: 90,
    margin: 5,
  },
});

export default EasyMountain;
