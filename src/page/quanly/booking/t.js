import { useEffect } from "react";
import { Row } from "react-bootstrap";

const BKT = ({ tourData, hanhKhach }) => {
  useEffect(() => {}, [tourData, hanhKhach]);

  if (!tourData || !hanhKhach) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-md-3">
          <h2>Thông tin tour</h2>
        </div>
        <div className="col-lg-8 col-md-8">
          <div className="row">
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Mã Tour:</strong> {tourData.maTour}
            </p>
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Tên Tour:</strong> {tourData.tenTour}
            </p>
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Số lượng người:</strong> {tourData.soLuongNguoi}
            </p>
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Số lượng người đã đặt:</strong>{" "}
              {tourData.soLuongNguoiDaDat}
            </p>
          </div>
          <div className="row">
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Ngày khởi hành:</strong> {tourData.ngayKhoiHanh}
            </p>
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Số ngày:</strong> {tourData.soNgay}
            </p>
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Số đêm:</strong> {tourData.soDem}
            </p>
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Nơi khởi hành:</strong> {tourData.noiKhoiHanh}
            </p>
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Giờ tập trung:</strong> {tourData.gioTapTrung}
            </p>
            <p className="col-lg-3 col-md-4 col-sm-6">
              <strong>Giá:</strong> {tourData.gia}
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-3">
          <h2>Hành Khách</h2>
        </div>
        <div className="col-lg-8 col-md-8">
          <Row>
            <div className="col-lg-2">
              <strong>STT</strong>
            </div>
            <div className="col-lg-7">
              <strong>Tên hành khách</strong>
            </div>
            <div className="col-lg-3">
              <strong>Loại hành khách</strong>
            </div>
          </Row>

          {hanhKhach.map((hk, index) => (
            <div className="row" key={hk.idhanhKhach}>
              <div className="col-lg-2">{index + 1}</div>
              <div className="col-lg-7">{hk.tenHanhKhach}</div>
              <div className="col-lg-3">{hk.loaiHanhKhach}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BKT;
