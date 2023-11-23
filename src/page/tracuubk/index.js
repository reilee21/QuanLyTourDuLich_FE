import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import BK from "./bk";
import BKKS from "./ks";
import BKT from "./t";
import "./index.scss";
const TraCuuBooking = () => {
  const param = useParams();
  const [bookingData, setBookingData] = useState();
  const [tourData, setTourData] = useState();
  const [hanhKhach, setHanhKhach] = useState();
  const [khachsanData, setKhachsanData] = useState();
  const [type, setType] = useState(false);
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
  useEffect(() => {
    console.log(bookingData);
  }, [bookingData]);

  return (
    <div className="container-fluids">
      <div>
        <center>
          <h2> Thông tin booking</h2>
        </center>
      </div>
      <div className="booking-info row">
        <BK bookingData={bookingData} />
      </div>
      <div className="booking-detail row">
        {type == false ? (
          <BKKS khachsanData={khachsanData} bookingData={bookingData} />
        ) : (
          <BKT tourData={tourData} hanhKhach={hanhKhach} />
        )}
      </div>
    </div>
  );
};
export default TraCuuBooking;
