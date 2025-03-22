import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Icon "Check Circle" từ react-icons

const Payment = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Chuyển hướng đến trang order.js
    navigate('/order');
  };

  return (
    <div style={styles.container}>
      {/* Icon Thanh toán thành công */}
      <FaCheckCircle size={50} color="#4CAF50" style={styles.icon} />
      
      {/* Dòng chữ "Thanh toán thành công" */}
      <h2 style={styles.text}>Thanh toán thành công</h2>

      {/* Nút Xác nhận */}
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
};

export default Payment;
