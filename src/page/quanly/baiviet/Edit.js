import React, { useState } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useLocation, useNavigate } from "react-router-dom";
const EditBaiViet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const article = location.state.article;

  const [value, setValue] = useState(article.Noidung);
  const [ngay, setNgay] = useState(article.NgayDang);
  const [tieuDe, setTieuDe] = useState(article ? article.TieuDe : "");

  const ngayDang = `${
    ngay.getMonth() + 1
  }/${ngay.getDate()}/${ngay.getFullYear()}`;

  const handleClick = () => {
    console.log(JSON.stringify(tieuDe));
  };
  const handlePreview = () => {
    navigate("preview", {
      state: { article: article },
    });
  };
  return (
    <div className="edit_baiviet">
      <center>
        <input
          type="text"
          value={tieuDe}
          onChange={(e) => setTieuDe(e.target.value)}
          id="tieude"
        />
      </center>
      <Row>
        <h5>
          <p>Ngày đăng : {ngayDang}</p>
        </h5>
      </Row>

      <EditorToolbar toolbarId={"t2"} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules("t2")}
      />

      <div className="container_edit">
        <button
          id="btdel"
          type="submit"
          className="btn btn-danger "
          onClick={handleClick}
        >
          Xoá bài viết
        </button>

        <button type="submit" className="btn btn-success" onClick={handleClick}>
          Lưu chỉnh sửa
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handlePreview}
        >
          Xem trước
        </button>
      </div>
    </div>
  );
};

export default EditBaiViet;
