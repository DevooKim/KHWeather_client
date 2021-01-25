import React, { useEffect, useState } from "react";

const { kakao } = window;

function Test() {
  const [coords, setCoords] = useState();
  // const geocoder = new kakao.maps.services.Geocoder();
  // geocoder.addressSearch("대전광역시 대덕구 중리동", (result, status) => {
  //   if (status === new kakao.maps.services.Status.OK()) {
  //     setCoords(new kakao.maps.LatLng(result[0].y, result[0].x));
  //   }
  // });
  // return <div>{coords}</div>;
  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch("대전광역시 대덕구 중리동", (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const LatLng = new kakao.maps.LatLng(result[0].y, result[0].x);
        setCoords({ lat: LatLng.getLat(), lon: LatLng.getLng() });
      }
    });
    console.log(coords);
  }, []);

  return <div>{JSON.stringify(coords)}</div>;
}

export default Test;
