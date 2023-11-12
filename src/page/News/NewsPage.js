// Index.js
import React, { useEffect, useState } from 'react';
import NewsArticle from '../NewsArticle/NewsArticle'; // Create a NewsArticle component for displaying individual articles

const NewsPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Fetch news data when the component mounts
        const fetchNews = async () => {
            try {
                // Replace 'apiEndpoint' with the actual API endpoint for your news data
                const response = await fetch('apiEndpoint');
                const data = await response.json();
                setNews(data.articles);
            } catch (error) {
                console.error('Error fetching news', error);
            }
        };

        fetchNews();
    }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

    return (
        <div>
            <h1>News Page</h1>
            <ul>
                {news.map((article) => (
                    <NewsArticle key={article.id} article={article} />
                ))}
            </ul>
        </div>
    );
};

export default NewsPage;
