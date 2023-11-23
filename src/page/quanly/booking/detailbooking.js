import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import BK from "./bk";
import BKKS from "./ks";
import BKT from "./t";
import "./index.scss";
import { Button } from "react-bootstrap";
const DetailBooking = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState();
  const [tourData, setTourData] = useState();
  const [hanhKhach, setHanhKhach] = useState();
  const [khachsanData, setKhachsanData] = useState();
  const [type, setType] = useState(false);
  const [flag, setFlag] = useState(false);
  const fetchdata = async () => {
    try {
      const res = await axios.get(`api/bookings/${param.bookingid}`);
      setBookingData(res);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    const getphong = async (id) => {
      try {
        const res = await axios.get(`api/KhachSans/PhongKhachSan/${id}`);
        setKhachsanData(res);
      } catch (e) {
        console.error(e);
      }
    };
    const getTour = async (id) => {
      try {
        const res = await axios.get(`api/bookingtours/${id}`);
        setHanhKhach(res.hanhKhaches);
        setTourData(res.maTourNavigation);
      } catch (e) {
        console.error(e);
      }
    };
    if (bookingData)
      if (bookingData.bookingKs != null && bookingData.bookingKs.length > 0) {
        setType(false);
        getphong(bookingData.bookingKs[0].idLoaiPhong);
      } else if (
        bookingData.bookingTours != null &&
        bookingData.bookingTours.length > 0
      ) {
        setType(true);

        getTour(bookingData.bookingTours[0].idBookingTour);
      }
  }, [bookingData]);
  const handlupdate = async () => {
    const f = new FormData();
    f.append("isPaid", bookingData.thanhToan);
    try {
      await axios.put(`api/bookings/${param.bookingid}`, f);
      alert("Thành công");
      setFlag(false);
      fetchdata();
    } catch (e) {
      console.error(e);
    }
  };
  const back = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="container-fluids">
        <div>
          {flag == true ? (
            <Button className="sav" onClick={handlupdate}>
              Lưu cập nhật
            </Button>
          ) : (
            <Button className="sav" onClick={back}>
              Quay về
            </Button>
          )}
          <center>
            <h2> Thông tin booking</h2>
          </center>
        </div>
        <div className="booking-info row">
          <BK
            bookingData={bookingData}
            setBookingData={setBookingData}
            setFlag={setFlag}
          />
        </div>
        <div className="booking-detail row">
          {type == false ? (
            <BKKS khachsanData={khachsanData} bookingData={bookingData} />
          ) : (
            <BKT tourData={tourData} hanhKhach={hanhKhach} />
          )}
        </div>
      </div>
    </>
  );
};

export default DetailBooking;
