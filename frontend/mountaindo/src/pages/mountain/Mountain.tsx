import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import {getMountainList} from '../../slices/mountainSlice/mountain';
import {useAppDispatch} from '../../store';

type MountainScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'Mountain'
>;

function Mountain({navigation}: MountainScreenProps) {
  const dispatch = useAppDispatch();
  const dispatchMountainList: any = useCallback(() => {
    dispatch(getMountainList(''))
      .then((res: any) => {
        console.log('MOUNTAINLIST RES ==>', res);
      })
      .catch((err: any) => {
        console.log('MOUNTAINLIST ERR ==>', err);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatchMountainList();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Text> Mountain</Text>
        <Pressable onPress={() => navigation.navigate('MountainDetail')}>
          <Text>MountainDetail</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
});

export default Mountain;
