import React from "react";
import "../../theme/Address.css";

function Address({
  input,
  onChange,
  onSubmit,
  onClick,
  overlay = false,
  address,
}) {
  // console.log(test);
  const overlayStyle = overlay ? { position: "fixed" } : { display: "none" };
  return (
    <div className="Address">
      <div className="address__input">
        <input
          name="Geo"
          placeholder="주소 입력"
          onChange={onChange}
          value={input}
        />
        {/* <button onClick={onSubmit}>입력</button> */}
      </div>
      <div className="address__overlay" style={overlayStyle}>
        {address.map((v, index) => (
          <div
            key={index}
            onClick={onClick({
              address_name: v.address_name,
              lat: v.y,
              lon: v.x,
            })}
          >
            {v.address_name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Address;
