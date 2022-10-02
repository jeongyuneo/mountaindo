import React from 'react';
import {ScrollView} from 'react-native';
import {VisitedListType} from '../../pages/completed/Visited';
import VisitedListItem from './VisitedListItem';

export type TrailType = {
  id: number;
  trail: string;
  level: string;
  timeDuration: string;
  location: string;
  visitedDate: string;
  totalDistance: number;
  totalHigh: number;
};

// Visited 페이지에서 받아온 정보 타입 설정
interface Props {
  moveToVisitedDetail: any;
  visitedTrail: VisitedListType[];
}

function VisitedList({moveToVisitedDetail, visitedTrail}: Props) {
  return (
    // visitedMountainList의 길이가 0이상일 경우 map으로 VisitedListItem에 전달
    <ScrollView>
      {visitedTrail.length > 0 &&
        visitedTrail.map((item, index) => (
          <VisitedListItem
            key={index}
            mountainName={item.mountainName}
            address={item.address}
            lastHikingDate={item.lastHikingDate}
            lastHikingTrailName={item.lastHikingTrailDate}
            moveToVisitedDetail={moveToVisitedDetail}
          />
        ))}
    </ScrollView>
  );
}

export default VisitedList;
