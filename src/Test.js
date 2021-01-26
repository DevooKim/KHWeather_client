import React, { useState } from "react";

const { kakao } = window;

function Test() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const ps = new kakao.maps.services.Places();

  const onChange = (e) => {
    // e.preventDefault();
    setValue(e.target.value);

    searchPlaces(value);
  };

  const searchPlaces = (value) => {
    console.log("start Search");
    ps.keywordSearch(value, placesSearchCB);
  };

  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log(data);
      // setResult(data);
    }
  };

  return (
    <>
      <input value={value} onChange={onChange} />
      <div>{result}</div>
    </>
  );
}

export default Test;
