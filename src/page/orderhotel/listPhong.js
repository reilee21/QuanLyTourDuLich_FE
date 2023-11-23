import React, { useState } from "react";

const ListPhong = ({ bk, setBk, hotel, addRoomToOrder }) => {
  return (
    <div className="row col-lg-12 col-md-12 col-sm-12">
      {hotel.loaiPhongs.map((item, index) => (
        <div
          className="phong row col-lg-6 col-md-6 col-sm-6"
          key={item.idLoaiPhong}
          onClick={() => addRoomToOrder(item)}
        >
          <div className="ten row">
            <span>{item.tenLoai}</span>
          </div>
          <div className="anh col-lg-6 col-md-6 col-sm-6">
            <img
              className="imghotel col-lg-3 col-md-3"
              src={`data:image/jpeg;base64,${hotel.anh}`}
              alt={`Tour Image ${hotel.ten}`}
            />
          </div>
          <div className="info col-lg-6 col-md-6 col-sm-6">
            <div className="mota">
              <span>{item.mota}</span>
            </div>
            <hr />
            <div className="gia">
              <span>{item.gia.toLocaleString()} đ</span>
            </div>
            <div className="avai">
              <span>Số phòng còn lại : {item.soPhong}</span>
            </div>
            <div className="avai">
              <span>Số phòng còn lại : {item.soPhong}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListPhong;
