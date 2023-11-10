import React, { useState } from 'react';
import './FaqPage.css';

const FaqPage = () => {

    
    const faqData = [
        {
            question: 'Làm thế nào để tìm kiếm các tour du lịch phù hợp với mong muốn?',
            answer: 'Để tìm các tour du lịch phù hợp, bạn có thể sử dụng thanh công cụ tìm kiếm trên trang web của chúng tôi. Nhập địa điểm hoặc loại tour bạn quan tâm, sau đó lọc kết quả theo ngày, giá cả và các yêu cầu khác để tìm tour tốt nhất cho bạn'
        },
        {
            question: 'Tôi có thể hủy đặt tour sau khi đã thanh toán không?',
            answer: 'Có, bạn có thể hủy đặt tour nhưng quy định hủy bỏ và chính sách hoàn tiền có thể khác nhau tùy thuộc vào tour cụ thể. Vui lòng xem chính sách hủy bỏ của từng tour để biết thêm chi tiết'
        },
        {
            question: 'Làm thế nào để tôi biết thời gian và điểm khởi hành của tour?',
            answer: 'Thông tin về thời gian và điểm khởi hành của mỗi tour sẽ được cung cấp trong trang thông tin chi tiết của tour. Bạn có thể xem thông tin này trước khi đặt tour.'
        },
        {
            question: 'Tôi cần chuẩn bị những gì trước khi tham gia tour du lịch?',
            answer: 'Trước khi tham gia tour, chắc chắn kiểm tra danh sách đồ cụ thể cho tour đó. Thông tin về đồ cụ và mặc đồ thích hợp sẽ được cung cấp trong trang thông tin tour. Đảm bảo bạn có đủ thời gian để chuẩn bị trước khi tour khởi hành'
        },
        {
            question: 'Tôi có thể yêu cầu thực phẩm đặc biệt hoặc cần chú ý đến chế độ ăn uống không?',
            answer: 'Nếu bạn có yêu cầu đặc biệt về thực phẩm hoặc có các hạn chế về chế độ ăn uống, xin vui lòng thông báo cho chúng tôi khi đặt tour. Chúng tôi sẽ cố gắng điều chỉnh để đáp ứng nhu cầu của bạn'
        },
        {
            question: 'Làm thế nào để liên hệ với chúng tôi nếu tôi có thêm câu hỏi hoặc yêu cầu?',
            answer: 'Để liên hệ với chúng tôi, bạn có thể sử dụng thông tin liên hệ được cung cấp trên trang web của chúng tôi. Chúng tôi sẵn sàng trợ giúp bạn và giải quyết mọi câu hỏi hoặc yêu cầu của bạn'
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq_main">
            <div className="faq-container">
                <h1 className="faq_title">Câu Hỏi Thường Gặp</h1>
                <ul>
                    {faqData.map((faq, index) => (
                        <li key={index}>
                            <div
                                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleAnswer(index)}
                            >
                                {faq.question}
                            </div>
                            <p className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>{faq.answer}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FaqPage;
