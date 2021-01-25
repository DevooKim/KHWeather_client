const { kakao } = window;

export function AddressSearch(address) {
  const geocoder = new kakao.maps.services.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const LatLng = new kakao.maps.LatLng(result[0].y, result[0].x);
        resolve({ lat: LatLng.getLat(), lon: LatLng.getLng() });
      }
      reject();
    });
  });
}

export function Coord2RegionCode(coord) {
  const geocoder = new kakao.maps.services.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.coord2RegionCode(coord.lon, coord.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result[0].address_name);
      }
      reject();
    });
  });
}
