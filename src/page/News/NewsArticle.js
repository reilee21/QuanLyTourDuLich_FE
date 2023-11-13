import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './news.css';
// Sample data (you can move this to a separate file if needed)
const sampleData = [
    {
        id: 1,
        NgayDang: '2023-11-10',
        NoiDung: 'Nội dung bài báo hạdhajkfhdjakhfkja',
        AnhBia: 'url-to-image-1.jpg',
        TieuDe: 'Tiêu đề bài báo 1',
    },
    {
        id: 2,
        NgayDang: '2023-11-09',
        NoiDung: 'Nội dung bài báo 2',
        AnhBia: 'url-to-image-2.jpg',
        TieuDe: 'Tiêu đề bài báo 2',
    },
    // Add more articles if needed
];

const NewsArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        // Find the article with the matching id from the sample data
        const foundArticle = sampleData.find((a) => a.id.toString() === id);
        setArticle(foundArticle);
    }, [id]);

    // Render Loading... if the data is still being fetched
    // Render the article content
    return (
        <div>
            {article ? (
                <div>
                    <h1 style={{ textAlign: "center", marginTop: "20px", marginBottom: '50px' }}>{article.TieuDe}</h1>
                    <p>{article.NoiDung}</p>
                    {/* Add more content as needed */}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default NewsArticlePage;