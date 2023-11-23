import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./TourDetail.scss";
import { Row } from "react-bootstrap";
import LichTrinh from "./lichtrinh";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
const TourDetail = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const param = useParams();
  const [tour, setTour] = useState();

  const getData = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    try {
      const res = await axios.get(`/api/tours/${param.tourId}`);
      setTour(res);
    } catch (e) {
      alert("Lỗi không xác định");
      console.error(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (!tour) {
    return (
      <>
        <h4 className="wait"> Xin vui lòng chờ trong giây lát ...</h4>
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      </>
    );
  }

  const Booking = () => {
    if (!isLogin) {
      alert("Hãy đăng nhập");
      navigate("/login");
      return;
    }
    navigate(`/booking/tour/${tour.maTour}`, { state: { tour: tour } });
  };
  return (
    <>
      <div className="tour-details row">
        <div className="tour-info ">
          <h2>{tour.tenTour}</h2>
          <Row>
            <div className="tour-image col-lg-6 col-md-6">
              <img
                className="image"
                src={`data:image/jpeg;base64,${tour.image}`}
                alt={`Tour Image ${tour.tenTour}`}
              />
            </div>
            <div className="tour-infop col-lg-6 col-md-6">
              <Row>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  Mã tour : <span className="gia">{tour.maTour}</span>
                </div>
                <div className="dattour col-lg-6 col-md-6 col-sm-6">
                  <div className="clk row" onClick={Booking}>
                    <CiShoppingCart
                      className="col-lg-4 col-md-4 col-sm-4"
                      size={48}
                    />{" "}
                    <span className="col-lg-6 col-md-6 col-sm-6">Đặt ngay</span>
                  </div>
                </div>
              </Row>
              <p>
                Giá:{" "}
                <span className="gia">
                  {tour.gia.toLocaleString()} VND/người
                </span>
              </p>
              <p>
                Điểm xuất phát: <span>{tour.noiKhoiHanh}</span>
              </p>
              <p>
                Số lượng người: <span>{tour.soLuongNguoi}</span>{" "}
                <span className="avai-slots">
                  Số chỗ còn lại :
                  <span className="num">
                    {tour.soLuongNguoi - tour.soLuongNguoiDaDat}
                  </span>
                </span>
              </p>
              <p>
                Ngày khởi hành: <span>{tour.ngayKhoiHanh.slice(0, 10)}</span> -
                Giờ tập trung: <span>{tour.gioTapTrung.slice(11, 16)}</span>
              </p>
              <p>
                Thời gian: <span>{tour.soNgay} </span> ngày
                <span> {tour.soDem} </span> đêm
              </p>
            </div>
          </Row>
        </div>
        <Row className="lichtrinh ">
          <LichTrinh lichtrinh={tour.lichTrinhs} />
        </Row>
      </div>
    </>
  );
};

export default TourDetail;
