import React, { useState, useEffect } from "react";
import { Button, Form, Row, Table } from "react-bootstrap";

const LoaiPhongs = ({
  loaiphonglist,
  handleLoaiPhongChange,
  handleAddLoaiPhong,
}) => {
  const handleLoaiPhongBlur = (index) => {
    // const updatedLoaiPhongList = [...loaiphonglist];
    // const currentLoaiPhong = updatedLoaiPhongList[index];
    // if (currentLoaiPhong.TenLoai.trim() === "") {
    //   updatedLoaiPhongList.splice(index, 1);
    //   setLoaiphonglist(updatedLoaiPhongList);
    // }
  };
  return (
    <>
      <Row>
        <Form.Group controlId="loaiphong" className="col-lg-10 col-md-10">
          <Form.Label>Loại Phòng</Form.Label>

          <Table striped bordered hover className="kslp">
            <thead>
              <tr>
                <th className="tenp">Tên </th>
                <th className="motap">Mô Tả</th>
                <th className="giap">Giá</th>
                <th className="delp"></th>
              </tr>
            </thead>
            <tbody>
              {loaiphonglist.map((loaiPhong, index) => (
                <tr key={index} onBlur={() => handleLoaiPhongBlur(index)}>
                  <td className="tenp">
                    <Form.Control
                      type="text"
                      value={loaiPhong.TenLoai}
                      onChange={(e) =>
                        handleLoaiPhongChange(index, "TenLoai", e.target.value)
                      }
                    />
                  </td>
                  <td className="motap">
                    <Form.Control
                      type="text"
                      value={loaiPhong.Mota}
                      onChange={(e) =>
                        handleLoaiPhongChange(index, "Mota", e.target.value)
                      }
                    />
                  </td>
                  <td className="giap">
                    <Form.Control
                      type="number"
                      value={loaiPhong.Gia}
                      onChange={(e) =>
                        handleLoaiPhongChange(index, "Gia", e.target.value)
                      }
                    />
                  </td>
                  <td className="delp">
                    <Button variant="outline-danger">x</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="success" onClick={handleAddLoaiPhong}>
            Thêm Loại Phòng
          </Button>
        </Form.Group>
      </Row>
    </>
  );
};

export default LoaiPhongs;
