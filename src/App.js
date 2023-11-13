// <<<<<<< bookingtour
// //App.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import './App.css';
// import { defaultRoute } from './routes';
// import DefaultLayout from './components/layouts/Layout';
// import HotelDetail from './page/orderhotel/hoteldetail'; // Import trang HotelDetail
// import NewsArticlePage from './page/News/NewsArticle';
// import TourDetail from './page/ordertour/tourdetail';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<DefaultLayout />}>
//           {defaultRoute.map((route, index) => {
//             const Page = route.component;
//             return <Route key={index} path={route.path} element={<Page />} />;
//           })}
//           {/* Thêm route cho HotelDetail */}
//           <Route path="/hoteldetail/:hotelId" element={<HotelDetail />} />
//           <Route path="/tourdetail/:tourId" element={<TourDetail />} /> {/* Thêm route cho TourDetail */}
//           <Route path="/news/:id" element={<NewsArticlePage />} />
//         </Route>
// =======
import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { defaultRoute, quanlyRoute } from "./routes";
import DefaultLayout from "./components/layouts/Layout";
import LayoutQly from "./components/layouts/LayoutQly";
import { useState } from "react";

function App() {
  const [role, setRole] = useState("qly");
  return (
    <div className="App">
      <Routes>
        {role && role !== "client" ? (
          <Route path="/admin" element={<LayoutQly />}>
            {quanlyRoute.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
        ) : (
          <Route element={<DefaultLayout />}>
            {defaultRoute.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
