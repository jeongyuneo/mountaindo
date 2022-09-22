import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DetailFilter from '../../components/main/DetailFilter';
import DetailList from '../../components/main/DetailList';
import DetailLocalList from '../../components/main/DetailLocalList';
import {DummyMountain, SeoulDummy, incheonDummy} from './DummyMountain';

function MainDetail() {
  const [local, setLocal] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.filterCon}>
          <DetailFilter setLocal={setLocal} />
        </View>
        <View style={{flex: 1}}>
          {(local === '전체' || local.length === 0) && (
            <DetailList DummyMountain={DummyMountain} />
          )}
          {(local === '서울' || local.length !== 0) && (
            <DetailLocalList SeoulDummy={SeoulDummy} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterCon: {
    flex: 0.3,
  },
  container: {
    flex: 1,
  },
});

export default MainDetail;
