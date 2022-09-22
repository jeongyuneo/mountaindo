import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

interface Props {
  dummyEasy: {
    id: number;
    profile: any;
    course: string;
    name: string;
    meter: number;
  }[];
}

function EasyMountain({dummyEasy}: Props) {
  return (
    <View>
      <ScrollView horizontal={true}>
        {dummyEasy.map(item => (
          <View key={item.id}>
            <Text style={styles.mountainCourse}>{item.course}</Text>
            <Image source={item.profile} style={styles.imgStyle} />
            <Text style={styles.mountainTitle}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mountainCourse: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
    marginLeft: 8,
  },
  mountainTitle: {
    fontWeight: 'bold',
    fontSize: 11,
    color: 'black',
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
