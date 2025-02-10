import React from 'react'
import '../Footer/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Maternity Care</h3>
                    <ul>
                        <li>Theo Dõi Thai Kỳ</li>
                        <li>Hồ Sơ Sức Khỏe</li>
                        <li>Hướng Dẫn Dinh Dưỡng</li>
                    </ul>
                </div>

                <div className="footer-section">
                <h3>Tài Nguyên</h3>
                    <ul>
                        <li><Link to='/community'>Cộng Đồng</Link></li>
                        <li>FAQ</li>
                        <li>Hỗ trợtrợ</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Liên hệ</h3>
                    <ul>
                        <li>Email: HaiHa@gmail.com</li>
                        <li>Phone: (123) 456-7890</li>
                        <li>Address: 123 Baby Care St</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Baby Care. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer