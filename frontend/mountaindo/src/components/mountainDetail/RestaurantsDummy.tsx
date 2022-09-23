// 임시 데이터
export const RestaurantsDummy = [
  {
    id: 1,
    name: '계룡산 식당',
    imageSrc: require('../../assets/restaurant1.jpg'),
    signatureMenu: '된장찌개',
    location: '대전광역시 유성구...',
    operationTime: '10:00 ~ 19:00',
    review: [
      {
        userName: 'Mountain',
        content: '여기 정말 맛있어요. 등산 후 배고플 때 먹으면 최고!',
      },
      {
        userName: '유재석',
        content:
          '네 안녕하세요. 제가 바로 국민 MC입니다. 제가 인정한 맛집입니다.',
      },
      {
        userName: '프로불편러',
        content:
          '맛은 그냥 그렇고 가격 너무 비싸요. 그리고 좀 가게가 더러워요.',
      },
    ],
  },
  {
    id: 2,
    name: '서울 식당',
    imageSrc: require('../../assets/restaurant2.jpg'),
    signatureMenu: '김치찌개',
    location: '대전광역시 유성구...',
    operationTime: '10:00 ~ 19:00',
    review: [
      {
        userName: 'Mountain',
        content: '여기 정말 맛있어요. 등산 후 배고플 때 먹으면 최고!',
      },
      {
        userName: '유재석',
        content:
          '네 안녕하세요. 제가 바로 국민 MC입니다. 제가 인정한 맛집입니다.',
      },
      {
        userName: '프로불편러',
        content:
          '맛은 그냥 그렇고 가격 너무 비싸요. 그리고 좀 가게가 더러워요.',
      },
    ],
  },
];

export default RestaurantsDummy;
