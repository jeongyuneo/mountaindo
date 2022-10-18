import React from 'react';
import {
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  View,
} from 'react-native';
import Review from './Review';

interface Props {
  visibleModal: boolean;
  setVisibleModal: any;
  name: string;
  imageSrc: any;
  signatureMenu: string;
  location: string;
  operationTime: string;
  review: any;
}

function RestaurantModal({
  visibleModal,
  setVisibleModal,
  name,
  imageSrc,
  signatureMenu,
  location,
  operationTime,
  review,
}: Props) {
  return (
    <Modal animationType="none" transparent={true} visible={visibleModal}>
      <SafeAreaView
        // eslint-disable-next-line react-native/no-inline-styles
        style={styles.safeAreaView}>
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          style={styles.scrollView}>
          <Pressable
            onPress={() => setVisibleModal((visible: boolean) => !visible)}>
            <Text style={styles.nameText}>{name}</Text>
            <Image source={imageSrc} />
            <View style={styles.contentWrapper}>
              <Text style={styles.contentText}>위치: {location}</Text>
              <Text style={styles.contentText}>영업 시간: {operationTime}</Text>
              <Text style={styles.contentText}>대표 메뉴: {signatureMenu}</Text>
              <View style={styles.reviewWrapper}>
                <Text style={styles.reviewTitleText}>후기</Text>
                {review.map((item: {userName: string; content: string}) => (
                  <Review userName={item.userName} content={item.content} />
                ))}
              </View>
            </View>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginVertical: '5%',
  },
  scrollView: {
    flex: 0.9,
    borderRadius: 5,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  nameText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  contentWrapper: {
    marginVertical: 20,
  },
  contentText: {
    color: 'black',
    fontSize: 12,
  },
  reviewWrapper: {
    marginTop: 20,
  },
  reviewTitleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default RestaurantModal;
