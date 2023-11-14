import React, { useState, useEffect } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import Edit from "./Edit";
import "./index.scss";
import baiVietData from "./data";
import { useNavigate } from "react-router-dom";

const BaiViet = () => {
  const [baiVietList, setBaiVietList] = useState(baiVietData);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setBaiVietList(baiVietData);
  }, [baiVietData]);

  const handleCardClick = (baiViet) => {
    setSelectedArticle(baiViet);
    navigate(`${baiViet.IdBaiViet}`, { state: { article: baiViet } });
  };
  const handleAdd = () => {
    navigate("them");
  };
  const [listdata, setListdata] = useState(baiVietData);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const currentPageData = listdata.slice(offset, offset + itemsPerPage);
  return (
    <>
      <center>
        <h2 className="pagetitle">Bài viết</h2>
      </center>
      <div
        className="col-md-12 d-flex justify-content-between align-items-center mb-3"
        id="act"
      >
        <Button className="add" variant="success" onClick={handleAdd}>
          Thêm mới
        </Button>
      </div>
      <section className="articles">
        {currentPageData.map((baiViet, index) => (
          <article
            key={baiViet.IdBaiViet}
            onClick={() => handleCardClick(baiViet)}
          >
            <div className="article-wrapper">
              <figure>
                <img src={baiViet.AnhBia} alt="" />
              </figure>
              <div className="article-body">
                <center>
                  <h4>{baiViet.TieuDe}</h4>
                  <p>{baiViet.NgayDang.toDateString()}</p>
                </center>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination */}
      <Row className="d-flex justify-content-center">
        <ReactPaginate
          pageCount={Math.ceil(baiVietData.length / itemsPerPage)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel={"Trước"}
          nextLabel={"Sau"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
        />
      </Row>
    </>
  );
};

export default BaiViet;
