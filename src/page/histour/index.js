import React, { useState, useEffect } from 'react';

const TourList = ({ tours }) => {
    return (
        <div>
            {tours.map((tour) => (
                <TourItem key={tour.id} tour={tour} />
            ))}
        </div>
    );
};

const TourItem = ({ tour }) => {
    return (
        <div>
            <h2>{tour.name}</h2>
            <p>{tour.details}</p>
        </div>
    );
};

const TourPage = () => {
    const [tours, setTours] = useState([]); // Set initial value to an empty array
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch tour data here and update the tours state
        // For example: fetchTours().then(data => setTours(data));
    }, []);

    const filteredTours = tours.filter((tour) =>
        tour.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1>Tour Đã Đi</h1>
            <input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <TourList tours={filteredTours} />
        </div>
    );
};

export default TourPage;
