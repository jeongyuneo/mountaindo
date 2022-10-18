import React from 'react';
import {VisitedListType} from '../../pages/completed/Visited';
import VisitedListItem from './VisitedListItem';

// Visited 페이지에서 받아온 정보 타입 설정
interface Props {
  moveToVisitedDetail: any;
  visitedTrail: VisitedListType[];
}

function VisitedList({moveToVisitedDetail, visitedTrail}: Props) {
  return (
    // visitedMountainList의 길이가 0이상일 경우 map으로 VisitedListItem에 전달
    <>
      {visitedTrail.length > 0 &&
        visitedTrail.map((item, index) => (
          <VisitedListItem
            key={index}
            mountainName={item.mountainName}
            hikingId={item.hikingId}
            trailName={item.trailName}
            lastHikingDate={item.lastHikingDate}
            useTime={item.useTime}
            level={item.level}
            moveToVisitedDetail={moveToVisitedDetail}
            imageUrl={item.imageUrl}
          />
        ))}
    </>
  );
}

export default VisitedList;
