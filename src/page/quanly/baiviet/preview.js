import { useLocation, useNavigate } from "react-router-dom";
import "./preview.scss";
import { useState } from "react";
const PreviewBaiViet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state.article;
  const [ngay, setNgay] = useState(article.NgayDang);
  const ngayDang = `${
    ngay.getMonth() + 1
  }/${ngay.getDate()}/${ngay.getFullYear()}`;

  const exit = () => {
    navigate(-1);
  };
  return (
    <div className="article_preview">
      <button className="btn btn-secondary" id="exit" onClick={exit}>
        Thoát xem trước
      </button>
      <center>
        <h3 className="article_title">{article.TieuDe}</h3>
      </center>
      <p className="article_date">{ngayDang}</p>
      <div
        className="article_content"
        dangerouslySetInnerHTML={{
          __html: article.Noidung,
        }}
      />
    </div>
  );
};
export default PreviewBaiViet;
