// HotelDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./scss/HotelDetail.scss";
import "./scss/loader.scss";
import { TiStarFullOutline } from "react-icons/ti";
import Success from "../../components/others/succsess";
import emailjs from "@emailjs/browser";
import { useAuth } from "../../context/AuthContext";

import axios from "../../api/axios";
import { Row } from "react-bootstrap";
import ListPhong from "./listPhong";
import BookingKS from "./cardbks";
const HotelDetail = () => {
  const serviceId = "service_rj30hx7";
  const templateId = "template_3slecnd";
  const publicKey = "L_RN4MgMzJH7bImjz";
  const { email, id, isLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: email,
    title: "Mã Booking",
    message: "123",
    end: "",
  });

  const sendEmail = () => {
    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then((response) => {})
      .catch((error) => {
        console.error("Email failed to send:", error);
      });
  };

  const param = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [hotel, setHotel] = useState(null);
  const [bookingKS, setBookingKS] = useState({
    ngayNhan: new Date(),
    ngayTra: new Date(),
    phongs: [],
  });
  const [bk, setBk] = useState({
    thoiDiemBook: new Date(),
    giaTri: "",
    thanhToan: false,
    loaiBooking: 1,
    maKh: id,
  });
  const getData = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    try {
      const res = await axios.get(`/api/khachsans/${param.hotelId}`);
      setHotel(res);
    } catch (e) {
      alert("Lỗi không xác định");
      console.error(e);
    }
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <TiStarFullOutline key={i} size={22} color="#fdc432" />
        ) : (
          ""
        )
      );
    }
    return stars;
  };
  useEffect(() => {
    getData();
  }, []);

  if (!hotel) {
    return (
      <>
        <h4 className="wait"> Xin vui lòng chờ trong giây lát ...</h4>
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      </>
    );
  }
  const confirm = async () => {
    if (!isLogin) {
      alert("Hãy đăng nhập");
      navigate("/login");
      return;
    }
    const formData = new FormData();
    const { phongs, ...bkf } = bookingKS;
    Object.keys(bkf).forEach((key) => {
      formData.append(key, bkf[key]);
    });
    formData.append("phongs", JSON.stringify(bookingKS.phongs));
    formData.append("booking", JSON.stringify(bk));

    try {
      await axios.post(`api/bookingks`, formData);
      setShowModal(true);
      sendEmail();

      setTimeout(() => {
        navigate(`/booking/payment`);
      }, 2000);
    } catch (e) {
      alert("Lỗi không xác định");

      console.error(e);
      return;
    }
  };
  const addToOrder = (room) => {
    setSelectedRoom((prevRoom) => {
      if (prevRoom === room) {
        return null;
      } else {
        return room;
      }
    });
  };
  return (
    <div className="hotel">
      <Row>
        <div className="info col-lg-8 col-md-8 col-sm-8">
          <Row className="coban">
            <div className="anh col-lg-6 col-md-6 col-sm-6">
              <img
                className="imghotel col-lg-3 col-md-3"
                src={`data:image/jpeg;base64,${hotel.anh}`}
                alt={`Tour Image ${hotel.ten}`}
              />
            </div>
            <div className="thongtin col-lg-6 col-md-6 col-sm-6">
              <div className="row ten">
                <span>{hotel.ten}</span>
              </div>
              <div className="sao">{renderStars(hotel.soSao)}</div>
              <div className="row mota">
                <span>{hotel.moTa}</span>
              </div>
            </div>
          </Row>
          <Row className="phongs">
            <ListPhong
              bk={bookingKS}
              setBk={setBookingKS}
              hotel={hotel}
              addRoomToOrder={addToOrder}
              selectedRoom={selectedRoom}
            />
          </Row>
        </div>
        <div className="booking col-lg-4 col-md-4 col-sm-4">
          <BookingKS
            selectedRoom={selectedRoom}
            setBookingKS={setBookingKS}
            confirm={confirm}
            setBk={setBk}
          />
        </div>
      </Row>
      <Success show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default HotelDetail;
