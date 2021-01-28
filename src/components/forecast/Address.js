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
  const overlayStyle = overlay ? {} : { display: "none" };

  return (
    <div className="address__input">
      {/* <div className="address__input"> */}
      <input
        name="Geo"
        placeholder="주소 입력"
        onChange={onChange}
        value={input}
      />
      {/* <button onClick={onSubmit}>입력</button> */}
      {/* </div> */}
      <div className="address__overlay" style={overlayStyle}>
        {address.map((v, index) => (
          <div
            className="overlay"
            key={index}
            onClick={onClick({
              address_name: v.address_name,
              coordinate: {
                lat: v.y,
                lon: v.x,
              },
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
