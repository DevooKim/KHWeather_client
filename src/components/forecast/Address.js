import React from "react";

function Address({ address, onChange, onCoder }) {
  return (
    <div>
      <input
        name="Geo"
        placeholder="주소 입력"
        onChange={onChange}
        value={address}
      />

      <button onClick={onCoder}>입력</button>
    </div>
  );
}

export default Address;
