// NewsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewsArticle from './NewsArticle';
import './news.css';
const NewsPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Sample data
        const sampleData = [
            {
                id: 1,
                NgayDang: '2023-11-10',
                NoiDung: 'Nội dung bài báo 1',
                AnhBia: 'url-to-image-1.jpg',
                TieuDe: 'Tiêu đề bài báo 1',
                MaNV: 1
            },
            {
                id: 2,
                NgayDang: '2023-11-09',
                NoiDung: 'Nội dung bài báo 2',
                AnhBia: 'url-to-image-2.jpg',
                TieuDe: 'Tiêu đề bài báo 2',
                MaNV: 2
            },
            // Add more articles if needed
        ];

        setNews(sampleData);
    }, []);

    return (
        <div className='tieudenews'>
            <h1 className="tentieude" style={{ textAlign: "center", marginTop: "20px", marginBottom: '50px' }}>
                Tin Tức <span style={{ color: 'yellow' }}>HuflitTravel</span>
            </h1>
            <ul>
                {news.map((article) => (
                    <li key={article.id}>
                        <Link to={`/news/${article.id}`} className="custom-link">
                            <h2>{article.TieuDe}</h2>
                            <img src={article.AnhBia} alt={article.TieuDe} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsPage;
