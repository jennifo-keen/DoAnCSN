import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../contexts/login-registerContext';

const Payment = () => {
  const [recipientInfo, setRecipientInfo] = useState(null);
  const [paymentMethods] = useState(['Ngân hàng', 'Trả sau']);
  const [editMode, setEditMode] = useState(false);  // Trạng thái chỉnh sửa thông tin
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  
  // Lấy thông tin người dùng từ AuthContext
  const { user } = useContext(AuthContext);

  // Lấy thông tin người nhận từ API
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

  // Cập nhật thông tin người nhận khi người dùng chỉnh sửa
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipientInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Cập nhật thông tin người nhận trong cơ sở dữ liệu
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

        // const data = await response.json();

        if (response.ok) {
          setEditMode(false);  // Tắt chế độ chỉnh sửa sau khi lưu thành công
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
    <div style={styles.container}>
      <FaCheckCircle size={50} color="#4CAF50" style={styles.icon} />
      <h2 style={styles.text}>Thanh toán thành công</h2>

      {/* Hiển thị thông tin người nhận hoặc các trường input để chỉnh sửa */}
      {recipientInfo ? (
        <div style={styles.info}>
          {editMode ? (
            <div>
              <label>Tên người nhận:</label>
              <input
                type="text"
                name="name"
                value={recipientInfo.name || ''}
                onChange={handleInputChange}
              />
              <br />
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={recipientInfo.phone || ''}
                onChange={handleInputChange}
              />
              <br />
              <label>Địa chỉ giao hàng:</label>
              <input
                type="text"
                name="shipping_address"
                value={recipientInfo.shipping_address || ''}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div>
              <p><strong>Tên người nhận:</strong> {recipientInfo.name || 'Không có thông tin'}</p>
              <p><strong>Số điện thoại:</strong> {recipientInfo.phone || 'Không có thông tin'}</p>
              <p><strong>Địa chỉ giao hàng:</strong> {recipientInfo.shipping_address || 'Không có thông tin'}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Đang tải thông tin người nhận...</p>
      )}

      {/* Hiển thị các phương thức thanh toán */}
      <div style={styles.paymentMethods}>
        <p><strong>Phương thức thanh toán:</strong></p>
        <select>
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>{method}</option>
          ))}
        </select>
      </div>

      {/* Nút Xác nhận hoặc Lưu thay đổi */}
      {editMode ? (
        <button onClick={handleSaveChanges} style={styles.button}>
          Lưu thay đổi
        </button>
      ) : (
        <button onClick={() => setEditMode(true)} style={styles.button}>
          Chỉnh sửa thông tin
        </button>
      )}
      
      <button onClick={handleConfirm} style={styles.button}>
        Xác nhận
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  icon: {
    marginBottom: '20px',
  },
  text: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  info: {
    marginTop: '20px',
    textAlign: 'left',
    fontSize: '18px',
  },
  paymentMethods: {
    marginTop: '20px',
  },
};

export default Payment;
