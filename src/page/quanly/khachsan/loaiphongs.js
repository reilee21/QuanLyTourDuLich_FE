import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { Button, Form, Row, Table } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";

const LoaiPhongs = ({ updatePhongs, ksdata }) => {
  const [loaiphonglist, setLoaiPhongList] = useState([]);
  useEffect(() => {
    if (ksdata.loaiPhongs) {
      setLoaiPhongList(ksdata.loaiPhongs);
    }
  }, [ksdata]);

  const handleLoaiPhongChange = (index, field, value) => {
    const updatedLoaiPhongList = loaiphonglist.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setLoaiPhongList(updatedLoaiPhongList);
  };
  useEffect(() => {
    updatePhongs(loaiphonglist);
  }, [loaiphonglist]);
  const handleAddLoaiPhong = () => {
    setLoaiPhongList([
      ...loaiphonglist,
      { tenLoai: "", mota: "", gia: "", soPhong: "" },
    ]);
  };

  const handleRemoveLoaiPhong = (index) => {
    const updatedLoaiPhongList = [...loaiphonglist];
    updatedLoaiPhongList.splice(index, 1);
    setLoaiPhongList(updatedLoaiPhongList);
  };

  return (
    <>
      <Row>
        <Form.Group controlId="loaiphong" className="col-lg-10 col-md-10">
          <Table striped bordered hover className="kslp">
            <thead>
              <tr>
                <th className="tenp">Tên </th>
                <th className="motap">Mô Tả</th>
                <th className="giap">Giá</th>
                <th className="phong">Số Phòng</th>
                <th className="delp"></th>
              </tr>
            </thead>
            <tbody>
              {loaiphonglist.map((loaiPhong, index) => (
                <tr key={index}>
                  <td className="tenp">
                    <Form.Control
                      type="text"
                      value={loaiPhong.tenLoai}
                      onChange={(e) =>
                        handleLoaiPhongChange(index, "tenLoai", e.target.value)
                      }
                    />
                  </td>
                  <td className="motap">
                    <Form.Control
                      type="text"
                      value={loaiPhong.mota}
                      onChange={(e) =>
                        handleLoaiPhongChange(index, "mota", e.target.value)
                      }
                    />
                  </td>
                  <td className="giap">
                    <Form.Control
                      type="number"
                      value={loaiPhong.gia}
                      onChange={(e) =>
                        handleLoaiPhongChange(index, "gia", e.target.value)
                      }
                    />
                  </td>
                  <td className="phong">
                    <Form.Control
                      type="number"
                      value={loaiPhong.soPhong}
                      onChange={(e) =>
                        handleLoaiPhongChange(index, "soPhong", e.target.value)
                      }
                    />
                  </td>
                  <td className="delp">
                    <Button
                      variant="outline-danger"
                      onClick={() => handleRemoveLoaiPhong(index)}
                    >
                      x
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form.Group>
      </Row>
      <IoIosAddCircleOutline
        className="iconaddp"
        size={48}
        color="#85EA2D"
        onClick={handleAddLoaiPhong}
      />
    </>
  );
};

export default LoaiPhongs;
