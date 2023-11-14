import React, { useState } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
const AddBaiViet = () => {
  const [value, setValue] = useState("");
  const [tieuDe, setTieuDe] = useState("");

  const handleClick = () => {
    console.log(JSON.stringify(tieuDe));
  };
  return (
    <div className="edit_baiviet">
      <center>
        <h2> Thêm bài viết</h2>
      </center>
      <center>
        <input
          type="text"
          value={tieuDe}
          onChange={(e) => setTieuDe(e.target.value)}
          id="tieude"
          placeholder="Nhập tiêu đề bài viết"
        />
      </center>

      <EditorToolbar toolbarId={"t2"} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules("t2")}
        placeholder="Nội dung bài viết"
      />

      <center>
        <button type="submit" className="btn btn-success" onClick={handleClick}>
          Thêm bài viết
        </button>
      </center>
    </div>
  );
};

export default AddBaiViet;
