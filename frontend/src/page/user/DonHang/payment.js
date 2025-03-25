import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../contexts/login-registerContext';
import styles from './Payment.module.scss';

const Payment = () => {
  const [recipientInfo, setRecipientInfo] = useState(null);
  const [paymentMethods] = useState(['Trả sau', 'Ngân hàng ( hiện chưa hỗ trợ )']);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && orderId) {
      fetch(`http://localhost:5000/api/order/recipient-info/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipientInfo(data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thông tin người nhận:", error);
        });
    }
  }, [user, orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipientInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (recipientInfo) {
      try {
        const response = await fetch(`http://localhost:5000/api/order/update-recipient/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: recipientInfo.name,
            phone: recipientInfo.phone,
            shipping_address: recipientInfo.shipping_address,
          }),
        });

        if (response.ok) {
          setEditMode(false);
          alert('Cập nhật thông tin thành công!');
        } else {
          alert('Không thể cập nhật thông tin!');
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        alert('Có lỗi xảy ra khi cập nhật thông tin!');
      }
    }
  };

  const handleConfirm = () => {
    if (orderId) {
      navigate(`/order/${orderId}`);
    } else {
      alert("Lỗi: Không có ID đơn hàng");
    }
  };

  return (
    <div className={styles.PaymentContainer}>
      <div className={styles.PaymentHeader}>
        <FaCheckCircle size={50} color="#4CAF50" className={styles.PaymentIcon} />
        <h2 className={styles.PaymentText}>Thanh toán thành công</h2>
      </div>

      <div className={styles.PaymentInfo}>
        {recipientInfo ? (
          editMode ? (
            <div className={styles.PaymentEditForm}>
              <label className={styles.PaymentLabel}>Tên người nhận:</label>
              <input
                type="text"
                name="name"
                value={recipientInfo.name || ''}
                onChange={handleInputChange}
                className={styles.PaymentInput}
              />
              <label className={styles.PaymentLabel}>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={recipientInfo.phone || ''}
                onChange={handleInputChange}
                className={styles.PaymentInput}
              />
              <label className={styles.PaymentLabel}>Địa chỉ giao hàng:</label>
              <input
                type="text"
                name="shipping_address"
                value={recipientInfo.shipping_address || ''}
                onChange={handleInputChange}
                className={styles.PaymentInput}
              />
            </div>
          ) : (
            <div className={styles.PaymentDetails}>
              <p><strong>Tên người nhận:</strong> {recipientInfo.name || 'Không có thông tin'}</p>
              <p><strong>Số điện thoại:</strong> {recipientInfo.phone || 'Không có thông tin'}</p>
              <p><strong>Địa chỉ giao hàng:</strong> {recipientInfo.shipping_address || 'Không có thông tin'}</p>
            </div>
          )
        ) : (
          <p>Đang tải thông tin người nhận...</p>
        )}
      </div>

      <div className={styles.PaymentMethods}>
        <p><strong>Phương thức thanh toán:</strong></p>
        <select className={styles.PaymentSelect}>
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div className={styles.PaymentActions}>
        {editMode ? (
          <button onClick={handleSaveChanges} className={styles.PaymentButton}>
            Lưu thay đổi
          </button>
        ) : (
          <button onClick={() => setEditMode(true)} className={styles.PaymentButton}>
            Chỉnh sửa thông tin
          </button>
        )}
        <button onClick={handleConfirm} className={styles.PaymentConfirmButton}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default Payment;