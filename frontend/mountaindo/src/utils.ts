// 경도, 위도를 기반으로 거리 계산
export const calDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
  const toRadian = (angle: any) => (Math.PI / 180) * angle;
  const distance = (a: any, b: any) => (Math.PI / 180) * (a - b);

  const RADIUS_OF_EARTH_IN_KM = 6371;
  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  lat1 = toRadian(lat1);
  lat2 = toRadian(lat2);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

  return finalDistance.toFixed(2);
};
