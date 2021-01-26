import React from "react";
import "../../theme/Address.css";

function Address({ address, onChange, onCoder, overlay = false }) {
  const overlayStyle = overlay ? { position: "fixed" } : { display: "none" };
  console.log(overlayStyle);
  return (
    <div className="Address">
      <div className="address__input">
        <input
          name="Geo"
          placeholder="주소 입력"
          onChange={onChange}
          value={address}
        />
        <button onClick={onCoder}>입력</button>
      </div>
      <div className="address__overlay" style={overlayStyle}>
        {address}
      </div>
    </div>
  );
}

export default Address;
