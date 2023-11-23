import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import "./bkt.scss";
import { MdDataSaverOn } from "react-icons/md";

import HanhKhach from "./hanhkhach";
import axios from "../../api/axios";
import Success from "../../components/others/succsess";
import { useAuth } from "../../context/AuthContext";
const BookTour = () => {
  const [showModal, setShowModal] = useState(false);

  const [apiCalled, setApiCalled] = useState(false);
  const { id } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const tour = location.state.tour;
  const [bookingInfo, setBookingInfo] = useState({
    maTour: tour.maTour,
    hanhKhaches: [],
    booking: "",
  });
  const [bk, setBk] = useState({
    thoiDiemBook: new Date(),
    giaTri: "",
    thanhToan: false,
    loaiBooking: 0,
    maNv: "",
    maKh: id,
    maVoucher: "",
  });
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const handleSelectParticipants = (value, type) => {
    const availableSlots = tour.soLuongNguoi - tour.soLuongNguoiDaDat;

    switch (type) {
      case "adults":
        value + childrenCount + infantsCount <= availableSlots
          ? setAdultsCount(value)
          : alert("Vượt quá số lượng người tham gia");
        break;
      case "children":
        value + adultsCount + infantsCount <= availableSlots
          ? setChildrenCount(value)
          : alert("Vượt quá số lượng người tham gia");
        break;
      case "infants":
        value + childrenCount + childrenCount <= availableSlots
          ? setInfantsCount(value)
          : alert("Vượt quá số lượng người tham gia");
        break;
      default:
        break;
    }
  };

  const calculateTotalPrice = () => {
    const adultPrice = tour.gia;
    const childPrice = tour.gia * 0.75;

    const totalAdultPrice = adultsCount * adultPrice;
    const totalChildPrice = childrenCount * childPrice;

    return totalAdultPrice + totalChildPrice;
  };
  const checkVoucher = async () => {
    const mavoucherInput = document.getElementById("mavoucher");
    const voucherCode = mavoucherInput.value;
    if (voucherCode.length > 0) {
      try {
        const response = await axios.get(`/api/vouchers/${voucherCode}`);
        const currentDate = new Date();
        const thoiGianBatDau = new Date(response.thoiGianBatDau);
        const thoiGianKetThuc = new Date(response.thoiGianKetThuc);

        if (currentDate < thoiGianBatDau || currentDate > thoiGianKetThuc) {
          alert("Mã Voucher đã quá hạn");
        } else if (response.soLuong <= 0) {
          alert("Mã Voucher đã hết lượt sử dụng");
        } else {
          const t = calculateTotalPrice() * response.phanTramGiam;
          setDiscount(t);
          setBk({ ...bk, maVoucher: response.maVoucher });
        }
      } catch (error) {
        alert(
          "Mã giảm giá chưa đúng. Xin vui lòng liên hệ nhân viên để biết thêm chi tiết"
        );
      }
    } else {
      alert("Bạn chưa nhập mã giảm giá");
      setDiscount(0);
      setBk({ ...bk, maVoucher: "" });
    }
  };
  const updatePassengers = (updatedPassengers) => {
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      hanhKhaches: updatedPassengers,
    }));
  };
  const handleConfirmBooking = async () => {
    if (adultsCount + childrenCount + infantsCount === 0) {
      alert("Vui lòng chọn số người tham gia trước khi xác nhận đặt tour.");
      return;
    }
    if (adultsCount == 0) {
      alert("Phải có người lớn tham gia");
      return;
    }
    const allNamesValid = bookingInfo.hanhKhaches.every(
      (hanhKhach) => hanhKhach.tenHanhKhach && hanhKhach.tenHanhKhach.length > 0
    );
    if (!allNamesValid || bookingInfo.hanhKhaches.length == 0) {
      alert("Hãy nhập thông tin hành khách");
      return;
    }
    const updatedBk = {
      ...bk,
      thoiDiemBook: new Date().toISOString().slice(0, 19).replace("T", " "),
      giaTri: calculateTotalPrice() - discount,
    };
    setBk(updatedBk);
    setBookingInfo((prevBookingInfo) => ({
      ...prevBookingInfo,
      booking: updatedBk,
    }));

    setApiCalled(true);
  };
  useEffect(() => {
    if (apiCalled) {
      dBK();
    }
  }, [bookingInfo, apiCalled]);

  const dBK = async () => {
    const formData = new FormData();
    const { booking, hanhKhaches, ...bkf } = bookingInfo;

    Object.keys(bkf).forEach((key) => {
      formData.append(key, bkf[key]);
    });
    formData.append("hanhKhaches", JSON.stringify(bookingInfo.hanhKhaches));
    formData.append("booking", JSON.stringify(bookingInfo.booking));

    try {
      const res = await axios.post("api/BookingTours", formData);
      setShowModal(true);
      setTimeout(() => {
        navigate(`/booking/payment`, { state: { idbk: res } });
      }, 2000);
    } catch (e) {
      alert("Lỗi không xác định");
      console.error(e);
      return;
    }

    setApiCalled(false);
  };
  return (
    <div className="bkingtour">
      <center>
        <h2> Đặt tour</h2>
      </center>
      <div className="tour-info ">
        <Row>
          <div className="tour-image col-lg-4 col-md-4">
            <img
              className="image"
              src={`data:image/jpeg;base64,${tour.image}`}
              alt={`Tour Image ${tour.tenTour}`}
            />
          </div>
          <div className="tour-infop col-lg-7 col-md-7">
            <p>
              {" "}
              Mã tour : <span className="gia">{tour.maTour}</span>
            </p>
            <p>
              <span className="tent">{tour.tenTour}</span>
            </p>
            <p>
              Điểm xuất phát: <span>{tour.noiKhoiHanh}</span>
            </p>
            <p>
              Số chỗ còn lại :
              <span className="avai-slots">
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
      <Row className="booking-section">
        <div className="booking-section0 col-lg-7 col-md-7">
          <Row className="hanhkhach">
            <div className="ctn col-lg-6 md-6 sm-6">
              <Row>
                <span className="col-lg-8">Người lớn:</span>
                <input
                  type="number"
                  className="col-lg-3"
                  min="1"
                  max={tour.soLuongNguoi - tour.soLuongNguoiDaDat}
                  value={adultsCount}
                  onChange={(e) =>
                    handleSelectParticipants(
                      parseInt(e.target.value, 10),
                      "adults"
                    )
                  }
                />
              </Row>
              <Row>
                <span className="col-lg-8">Trẻ em (dưới 12 tuổi):</span>
                <input
                  type="number"
                  className="col-lg-3"
                  min="0"
                  max={tour.soLuongNguoi - tour.soLuongNguoiDaDat - adultsCount}
                  value={childrenCount}
                  onChange={(e) =>
                    handleSelectParticipants(
                      parseInt(e.target.value, 10),
                      "children"
                    )
                  }
                />
              </Row>
              <Row>
                <span className="col-lg-8">Trẻ nhỏ (dưới 5 tuổi):</span>
                <input
                  type="number"
                  className="col-lg-3"
                  min="0"
                  max={
                    tour.soLuongNguoi -
                    tour.soLuongNguoiDaDat -
                    adultsCount -
                    childrenCount
                  }
                  value={infantsCount}
                  onChange={(e) =>
                    handleSelectParticipants(
                      parseInt(e.target.value, 10),
                      "infants"
                    )
                  }
                />
              </Row>
            </div>
          </Row>
          <Row>
            <HanhKhach
              adultsCount={adultsCount}
              childrenCount={childrenCount}
              infantsCount={infantsCount}
              updatePassengers={updatePassengers}
            />
          </Row>
        </div>
        <div className="booking-section1 col-lg-4 col-md-4">
          <div className="booking-section">
            <div className="booking-section">
              <h3>Đặt Tour</h3>
              <Row>
                <span className="col-lg-12">
                  Hành khách: {adultsCount + childrenCount + infantsCount}
                </span>
              </Row>
              <Row>
                <span className="col-lg-6">Người lớn</span>
                <span className="col-lg-6">
                  {adultsCount} x {tour.gia.toLocaleString()}₫
                </span>
              </Row>
              <Row>
                <span className="col-lg-6">Trẻ em</span>
                <span className="col-lg-6">
                  {childrenCount} x {(tour.gia * 0.75).toLocaleString()}₫
                </span>
              </Row>
              <Row>
                <span className="col-lg-6">Trẻ nhỏ</span>
                <span className="col-lg-6">{infantsCount} x 0₫</span>
              </Row>
              <Row>
                <span className="col-lg-12 col-md-12 col-sm-12">
                  Mã giảm giá
                </span>
              </Row>
              <Row>
                <input
                  id="mavoucher"
                  className="col-lg-8 col-md-8"
                  type="text"
                />
                <MdDataSaverOn
                  className="checkvc col-lg-4 col-md-4"
                  size={36}
                  color="#00cc47"
                  onClick={checkVoucher}
                />
              </Row>

              <Row>
                <span className="col-lg-7">Thành tiền:</span>
                <span className="col-lg-5">
                  {calculateTotalPrice().toLocaleString()}₫
                </span>
              </Row>
              {discount > 0 && (
                <Row>
                  <span className=" col-lg-7">Giảm giá:</span>
                  <span className=" col-lg-5">
                    {discount.toLocaleString()}₫
                  </span>
                </Row>
              )}
              <Row>
                <span className="tt col-lg-7">Tổng tiền:</span>
                <span className="ttt col-lg-5">
                  {(calculateTotalPrice() - discount).toLocaleString()}₫
                </span>
              </Row>
            </div>
          </div>
          <div>
            <button
              className="botton-xacnhan"
              onClick={handleConfirmBooking}
              disabled={
                adultsCount === 0 ||
                adultsCount + childrenCount + infantsCount === 0
              }
            >
              Xác nhận
            </button>
          </div>
        </div>
      </Row>

      <Success show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default BookTour;
