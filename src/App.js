//App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { defaultRoute } from './routes';
import DefaultLayout from './components/layouts/Layout';
import HotelDetail from './page/orderhotel/hoteldetail'; // Import trang HotelDetail
import NewsArticlePage from './page/News/NewsArticle';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {defaultRoute.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
          {/* Thêm route cho HotelDetail */}
          <Route path="/hoteldetail/:hotelId" element={<HotelDetail />} />
          <Route path="/news/:id" element={<NewsArticlePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
