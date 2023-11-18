import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TourDetail.scss";
import HanoiImage from "../../assets/image/hanoi.png";
import { Row } from "react-bootstrap";

const TourDetail = () => {
  const { tourId } = useParams();
  const [tourDetails, setTourDetails] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState(1);
  const [isMounted, setIsMounted] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourDetails = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      await delay(200);

      const sampleData = [
        {
          MaTour: "T-15112023-VJD8",
          TenTour: "Hà Giang - Lũng Cú - Đồng Văn - Mã Pí Lèng",
          SoLuongNguoi: 2,
          NgayKhoiHanh: "2023-11-15",
          SoNgay: 5,
          SoDem: 4,
          NoiKhoiHanh: "Hồ Chí Minh",
          GioTapTrung: "2023-11-15T08:00:00",
          Gia: 5000000,
          imageUrl: HanoiImage,
          MoTa: "Hà Giang là mảnh đất có rất nhiều màu sắc ấn tượng. Màu hồng phấn của những cánh đồng hoa tam giác mạch, mùa của hoa cải vàng, hoa mận, hoa ban; màu vàng ươm như rót mật của những thửa ruộng bậc thang mùa lúa chín; màu xanh của những dãy núi trùng điệp, của cung đường đèo Mã Pì Lèng nổi tiếng uốn lượn bên dòng sông Nho Quế thơ mộng… phủ khắp cả miền biên cương hùng vĩ của Tổ quốc. - Hà Giang còn mang sắc màu rực rỡ của những chiếc váy, của một không gian bồng bềnh mây khói, xanh ngắt của núi đồi với những con đường quanh co… Vẻ đẹp của cuộc sống giản dị hàng ngày giữa thiên nhiên hùng vĩ với những ánh mắt ngây thơ của trẻ nhỏ hay nụ cười hồn hậu của người dân… - Đặc biệt, du khách đến Hà Giang còn bị hớp hồn bởi những triền đá tai mèo trùng điệp, những con đường quanh co, uốn lượn, những điểm đến độc đáo như cao nguyên đá Đồng Văn, dinh thự họ Vương, cột cờ Lũng Cú hay cao điểm Vị Xuyên. Những sắc màu mang đầy sức sống của vùng sơn cước khi “cỏ cây chen đá, lá chen hoa” như mời gọi du khách đến với du lịch Hà Giang. Tất cả đã tạo nên một bức tranh Hà Giang rực rỡ làm say đắm lòng người và mời gọi du khách. - Tạm biệt cao nguyên đá Đồng Văn, Quý khách sẽ đặt chân đến vùng đất văn hóa của người Tày tại Vườn Quốc Gia Hồ Ba Bể, Bắc Cạn và Làng Đá Khuổi Ky, Cao Bằng. Nơi đây còn được biết đến với những danh thắng hùng vỹ như Hồ nước ngọt Ba Bể, Bắc Cạn - một trong một trăm hồ nước ngọt lớn nhất thế; thác Bản Giốc, Cao Bằng - thác nước lớn thứ tư thế giới trong số các thác nước đẹp nằm trên biên giới giữa các quốc gia, đồng thời là thác nước tự nhiên lớn nhất khu vực Đông Nam",
        },
        {
          MaTour: "T002",
          TenTour: "Tour 2",
          SoLuongNguoi: 15,
          NgayKhoiHanh: "2023-12-01",
          SoNgay: 7,
          SoDem: 6,
          NoiKhoiHanh: "Hà Nội",
          GioTapTrung: "2023-12-01T07:30:00",
          Gia: 7000000,
          imageUrl: "url-to-tour-image-2.jpg",
          MoTa: "Mô tả cho Tour 2...",
        },
        {
          MaTour: "T003",
          TenTour: "Tour 3",
          SoLuongNguoi: 12,
          NgayKhoiHanh: "2023-12-10",
          SoNgay: 3,
          SoDem: 2,
          NoiKhoiHanh: "Đà Nẵng",
          GioTapTrung: "2023-12-10T09:00:00",
          Gia: 3500000,
          imageUrl: "url-to-tour-image-3.jpg",
          MoTa: "Mô tả cho Tour 3...",
        },
      ];

      const selectedTour = sampleData.find((tour) => tour.MaTour === tourId);

      if (isMounted) {
        setTourDetails(selectedTour);
      }
    };

    fetchTourDetails();

    return () => {
      setIsMounted(false);
    };
  }, [tourId, isMounted]);

  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  const handleSelectParticipants = (value, type) => {
    const availableSlots = tourDetails.SoLuongNguoi;

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
    const adultPrice = tourDetails.Gia;
    const childPrice = tourDetails.Gia * 0.75; // 75% of adult price for children
    // Infants are free

    const totalAdultPrice = adultsCount * adultPrice;
    const totalChildPrice = childrenCount * childPrice;

    return totalAdultPrice + totalChildPrice;
  };
  const handleConfirmBooking = () => {
    if (adultsCount == 0) {
      alert("Phải có người lớn tham gia");
      return;
    }
    if (adultsCount + childrenCount + infantsCount === 0) {
      alert("Vui lòng chọn số người tham gia trước khi xác nhận đặt tour.");
      return;
    }

    // Lưu thông tin đặt tour vào localStorage
    const bookingData = {
      tourId: tourDetails.MaTour,
      participants: selectedParticipants,
      totalPrice: calculateTotalPrice(),
      departureDate: tourDetails.NgayKhoiHanh,
      gatheringTime: tourDetails.GioTapTrung,
    };
    //  localStorage.setItem('bookingData', JSON.stringify(bookingData));

    // Perform actions to confirm the booking, e.g., send data to the server
    alert("Đặt tour thành công");

    // Điều hướng sang trang lịch sử đặt tour
    //  navigate('/history');
  };

  if (!tourDetails) {
    return <p>Loading...</p>;
  }

  const totalPrice = calculateTotalPrice();

  return (
    <>
      <div className="tour-details row">
        <div className="tour-info col-lg-7 col-md-7">
          <h2>{tourDetails.TenTour}</h2>
          <Row>
            <div className="tour-image col-lg-7">
              <img
                className="image"
                src={tourDetails.imageUrl}
                alt={`Image of ${tourDetails.TenTour}`}
              />
            </div>
            <p className="mota col-lg-5">{tourDetails.MoTa}</p>
          </Row>
          <Row>
            <h5 className="col-lg-7">Mã tour:{tourDetails.MaTour}</h5>
            <h5 className="col-lg-5">
              Số chỗ còn lại : <span className="avai-slots">2</span>
            </h5>
          </Row>
          <div className="tour-infop row">
            <div className="col-lg-6">
              <p>Giá: {tourDetails.Gia} VND/người</p>
              <p>Điểm xuất phát: {tourDetails.NoiKhoiHanh}</p>
              <p>Số lượng người: {tourDetails.SoLuongNguoi}</p>
            </div>
            <div className="col-lg-6">
              <p>Ngày khởi hành: {tourDetails.NgayKhoiHanh}</p>
              <p>
                Thời gian: {tourDetails.SoNgay} ngày {tourDetails.SoDem} đêm
              </p>
              <p>Giờ tập trung: {tourDetails.GioTapTrung.slice(11, 16)}</p>
            </div>
          </div>
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
                  {adultsCount} x {tourDetails.Gia}₫
                </span>
              </Row>
              <Row>
                <span className="col-lg-6">Trẻ em</span>
                <span className="col-lg-6">
                  {childrenCount} x {tourDetails.Gia * 0.75}₫
                </span>
              </Row>
              <Row>
                <span className="col-lg-6">Trẻ nhỏ</span>
                <span className="col-lg-6">{infantsCount} x 0₫</span>
              </Row>
              <Row>
                <p className="col-lg-12">Tổng tiền: {calculateTotalPrice()}₫</p>
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
        <Row className="hanhkhach">
          <div className="ctn col-lg-7 md-7 sm-7">
            <Row>
              <span className="col-lg-5">Người lớn:</span>
              <input
                type="number"
                className="col-lg-3"
                min="1"
                max={tourDetails.SoLuongNguoi}
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
              <span className="col-lg-5">Trẻ em (dưới 12 tuổi):</span>
              <input
                type="number"
                className="col-lg-3"
                min="0"
                max={tourDetails.SoLuongNguoi - adultsCount}
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
              <span className="col-lg-5">Trẻ nhỏ (dưới 5 tuổi):</span>
              <input
                type="number"
                className="col-lg-3"
                min="0"
                max={tourDetails.SoLuongNguoi - adultsCount - childrenCount}
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
      </div>
    </>
  );
};

export default TourDetail;
